﻿using System;
using System.Data;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace CommonLib
{
    public static class OracleHelper
    {
        #region private utility methods & constructors

        /// <summary>
        /// This method is used to attach array's of IDbDataParameters to an OracleCommand.
        ///
        /// This method will assign a value of DbNull to any parameter with a direction of
        /// InputOutput and a value of null.
        ///
        /// This behavior will prevent default values from being used, but
        /// this will be the less common case than an intended pure output parameter (derived as InputOutput)
        /// where the user provided no input value.
        /// </summary>
        /// <param name="command">The command to which the parameters will be added</param>
        /// <param name="commandParameters">an array of IDbDataParameters tho be added to command</param>
        private static void AttachParameters(OracleCommand command, IDbDataParameter[] commandParameters)
        {
            foreach (IDbDataParameter p in commandParameters)
            {
                // check for derived output value with no value assigned
                if ((p.Direction == ParameterDirection.InputOutput) && (p.Value == null))
                {
                    p.Value = DBNull.Value;
                }

                command.Parameters.Add(p);
            }
        }

        /// <summary>
        /// This method assigns an array of values to an array of IDbDataParameters.
        /// </summary>
        /// <param name="commandParameters">array of IDbDataParameters to be assigned values</param>
        /// <param name="parameterValues">array of objects holding the values to be assigned</param>
        private static void AssignParameterValues(IDbDataParameter[] commandParameters, object[] parameterValues)
        {
            if ((commandParameters == null) || (parameterValues == null))
            {
                // do nothing if we get no data
                return;
            }

            // we must have the same number of values as we pave parameters to put them in
            if (commandParameters.Length != parameterValues.Length)
            {
                throw new ArgumentException("Parameter count does not match Parameter Value count.");
            }

            // iterate through the IDbDataParameters, assigning the values from the corresponding position in the
            // value array
            for (int i = 0, j = commandParameters.Length; i < j; i++)
            {
                commandParameters[i].Value = parameterValues[i];
            }
        }

        /// <summary>
        /// This method opens (if necessary) and assigns a connection, transaction, command type and parameters
        /// to the provided command.
        /// </summary>
        /// <param name="command">the OracleCommand to be prepared</param>
        /// <param name="connection">a valid OracleConnection, on which to execute this command</param>
        /// <param name="transaction">a valid OracleTransaction, or 'null'</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters to be associated with the command or 'null' if no parameters are required</param>
        private static void PrepareCommand(OracleCommand command, OracleConnection connection, OracleTransaction transaction, CommandType commandType, string commandText, IDbDataParameter[] commandParameters)
        {
            // if the provided connection is not open, we will open it
            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }

            // associate the connection with the command
            command.Connection = connection;

            // set the command text (stored procedure name or Oracle statement)
            command.CommandText = commandText;

            // if we were provided a transaction, assign it.
            if (transaction != null)
            {
                // command.Transaction = transaction;
            }

            // set the command type
            command.CommandType = commandType;

            // bind by name or by order
            command.BindByName = true;

            // attach the command parameters if they are provided
            if (commandParameters != null)
            {
                AttachParameters(command, commandParameters);
            }
        }

        #endregion private utility methods & constructors

        #region ExecuteNonQuery

        /// <summary>
        /// Execute an OracleCommand (that returns no resultset and takes no parameters) against the database specified in
        /// the connection string.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int result = ExecuteNonQuery(connString, CommandType.StoredProcedure, "PublishOrders");
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(string connectionString, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteNonQuery(connectionString, commandType, commandText, (IDbDataParameter[])null);
        }

        public static Task<int> ExecuteNonQueryAsync(string connectionString, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteNonQueryAsync(connectionString, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns no resultset) against the database specified in the connection string
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int result = ExecuteNonQuery(connString, CommandType.StoredProcedure, "PublishOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(string connectionString, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create & open an OracleConnection, and dispose of it after we are done.
            using (OracleConnection cn = new OracleConnection(connectionString))
            {
                cn.Open();

                // call the overload that takes a connection in place of the connection string
                return ExecuteNonQuery(cn, commandType, commandText, commandParameters);
            }
        }

        public static async Task<int> ExecuteNonQueryAsync(string connectionString, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create & open an OracleConnection, and dispose of it after we are done.
            using (OracleConnection cn = new OracleConnection(connectionString))
            {
                await cn.OpenAsync();

                // call the overload that takes a connection in place of the connection string
                return await ExecuteNonQueryAsync(cn, commandType, commandText, commandParameters);
            }
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns no resultset) against the database specified in
        /// the connection string using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  int result = ExecuteNonQuery(connString, "PublishOrders", 24, 36);
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(string connectionString, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteNonQuery(connectionString, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteNonQuery(connectionString, CommandType.StoredProcedure, spName);
            }
        }

        public static Task<int> ExecuteNonQueryAsync(string connectionString, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteNonQueryAsync(connectionString, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteNonQueryAsync(connectionString, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute an OracleCommand (that returns no resultset and takes no parameters) against the provided OracleConnection.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int result = ExecuteNonQuery(conn, CommandType.StoredProcedure, "PublishOrders");
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(OracleConnection connection, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteNonQuery(connection, commandType, commandText, (IDbDataParameter[])null);
        }

        public static Task<int> ExecuteNonQueryAsync(OracleConnection connection, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteNonQueryAsync(connection, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns no resultset) against the specified OracleConnection
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int result = ExecuteNonQuery(conn, CommandType.StoredProcedure, "PublishOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(OracleConnection connection, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, connection, (OracleTransaction)null, commandType, commandText, commandParameters);

            // finally, execute the command.
            return cmd.ExecuteNonQuery();
        }

        public static Task<int> ExecuteNonQueryAsync(OracleConnection connection, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, connection, null, commandType, commandText, commandParameters);

            return cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns no resultset) against the specified OracleConnection
        /// using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  int result = ExecuteNonQuery(conn, "PublishOrders", 24, 36);
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(OracleConnection connection, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteNonQuery(connection, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteNonQuery(connection, CommandType.StoredProcedure, spName);
            }
        }

        public static Task<int> ExecuteNonQueryAsync(OracleConnection connection, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteNonQueryAsync(connection, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteNonQueryAsync(connection, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute an OracleCommand (that returns no resultset and takes no parameters) against the provided OracleTransaction.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int result = ExecuteNonQuery(trans, CommandType.StoredProcedure, "PublishOrders");
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteNonQuery(transaction, commandType, commandText, (IDbDataParameter[])null);
        }

        public static Task<int> ExecuteNonQueryAsync(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteNonQueryAsync(transaction, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns no resultset) against the specified OracleTransaction
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int result = ExecuteNonQuery(trans, CommandType.StoredProcedure, "GetOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(OracleTransaction transaction, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            // finally, execute the command.
            return cmd.ExecuteNonQuery();
        }

        public static Task<int> ExecuteNonQueryAsync(OracleTransaction transaction, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            // finally, execute the command.
            return cmd.ExecuteNonQueryAsync();
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns no resultset) against the specified
        /// OracleTransaction using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  int result = ExecuteNonQuery(conn, trans, "PublishOrders", 24, 36);
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an int representing the number of rows affected by the command</returns>
        public static int ExecuteNonQuery(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populet the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(transaction.Connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteNonQuery(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteNonQuery(transaction, CommandType.StoredProcedure, spName);
            }
        }

        public static Task<int> ExecuteNonQueryAsync(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populet the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(transaction.Connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteNonQueryAsync(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteNonQueryAsync(transaction, CommandType.StoredProcedure, spName);
            }
        }

        #endregion ExecuteNonQuery

        #region ExecuteDataSet

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset and takes no parameters) against the database specified in
        /// the connection string.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(connString, CommandType.StoredProcedure, "GetOrders");
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(string connectionString, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteDataset(connectionString, commandType, commandText, (IDbDataParameter[])null);
        }

        public static Task<DataSet> ExecuteDatasetAsync(string connectionString, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteDatasetAsync(connectionString, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset) against the database specified in the connection string
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(connString, CommandType.StoredProcedure, "GetOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(string connectionString, CommandType commandType, string commandText, IDbDataParameter[] commandParameters)
        {
            // create & open an OracleConnection, and dispose of it after we are done.
            using (OracleConnection cn = new OracleConnection(connectionString))
            {
                cn.Open();

                // call the overload that takes a connection in place of the connection string
                return ExecuteDataset(cn, commandType, commandText, commandParameters);
            }
        }

        public static async Task<DataSet> ExecuteDatasetAsync(string connectionString, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create & open an OracleConnection, and dispose of it after we are done.
            using (OracleConnection cn = new OracleConnection(connectionString))
            {
                await cn.OpenAsync();

                // call the overload that takes a connection in place of the connection string
                return await ExecuteDatasetAsync(cn, commandType, commandText, commandParameters);
            }
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a resultset) against the database specified in
        /// the conneciton string using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(connString, "GetOrders", 24, 36);
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(string connectionString, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populet the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteDataset(connectionString, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteDataset(connectionString, CommandType.StoredProcedure, spName);
            }
        }

        public static Task<DataSet> ExecuteDatasetAsync(string connectionString, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populet the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteDatasetAsync(connectionString, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteDatasetAsync(connectionString, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset and takes no parameters) against the provided OracleConnection.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(conn, CommandType.StoredProcedure, "GetOrders");
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(OracleConnection connection, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteDataset(connection, commandType, commandText, (IDbDataParameter[])null);
        }

        public static Task<DataSet> ExecuteDatasetAsync(OracleConnection connection, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteDatasetAsync(connection, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset) against the specified OracleConnection
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(conn, CommandType.StoredProcedure, "GetOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(OracleConnection connection, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, connection, (OracleTransaction)null, commandType, commandText, commandParameters);

            // create the DataAdapter & DataSet
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            DataSet ds = new DataSet();

            // fill the DataSet using default values for DataTable names, etc.
            da.Fill(ds);

            // return the dataset
            return ds;
        }

        public static async Task<DataSet> ExecuteDatasetAsync(OracleConnection connection, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, connection, null, commandType, commandText, commandParameters);

            // create the DataAdapter & DataSet
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            DataSet ds = new DataSet();

            // fill the DataSet using default values for DataTable names, etc.
            await Task.Run(() => da.Fill(ds)).ConfigureAwait(false);

            // return the dataset
            return ds;
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a resultset) against the specified OracleConnection
        /// using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(conn, "GetOrders", 24, 36);
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(OracleConnection connection, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteDataset(connection, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteDataset(connection, CommandType.StoredProcedure, spName);
            }
        }

        public static Task<DataSet> ExecuteDatasetAsync(OracleConnection connection, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteDatasetAsync(connection, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteDatasetAsync(connection, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset and takes no parameters) against the provided OracleTransaction.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(trans, CommandType.StoredProcedure, "GetOrders");
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteDataset(transaction, commandType, commandText, (IDbDataParameter[])null);
        }

        public static Task<DataSet> ExecuteDatasetAsync(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteDatasetAsync(transaction, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset) against the specified OracleTransaction
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(trans, CommandType.StoredProcedure, "GetOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(OracleTransaction transaction, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            // create the DataAdapter & DataSet
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            DataSet ds = new DataSet();

            // fill the DataSet using default values for DataTable names, etc.
            da.Fill(ds);

            // return the dataset
            return ds;
        }

        public static async Task<DataSet> ExecuteDatasetAsync(OracleTransaction transaction, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            // create the DataAdapter & DataSet
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            DataSet ds = new DataSet();

            // fill the DataSet using default values for DataTable names, etc.
            await Task.Run(() => da.Fill(ds)).ConfigureAwait(false);

            // return the dataset
            return ds;
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a resultset) against the specified
        /// OracleTransaction using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  DataSet ds = ExecuteDataset(trans, "GetOrders", 24, 36);
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>a dataset containing the resultset generated by the command</returns>
        public static DataSet ExecuteDataset(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(transaction.Connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteDataset(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteDataset(transaction, CommandType.StoredProcedure, spName);
            }
        }

        public static Task<DataSet> ExecuteDatasetAsync(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(transaction.Connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteDatasetAsync(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteDatasetAsync(transaction, CommandType.StoredProcedure, spName);
            }
        }

        #endregion ExecuteDataSet

        #region ExecuteReader

        /// <summary>
        /// this enum is used to indicate weather the connection was provided by the caller, or created by OracleHelper, so that
        /// we can set the appropriate CommandBehavior when calling ExecuteReader()
        /// </summary>
        private enum OracleConnectionOwnership
        {
            /// <summary>Connection is owned and managed by OracleHelper</summary>
            Internal,

            /// <summary>Connection is owned and managed by the caller</summary>
            External,
        }

        /// <summary>
        /// Create and prepare an OracleCommand, and call ExecuteReader with the appropriate CommandBehavior.
        /// </summary>
        /// <remarks>
        /// If we created and opened the connection, we want the connection to be closed when the DataReader is closed.
        ///
        /// If the caller provided the connection, we want to leave it to them to manage.
        /// </remarks>
        /// <param name="connection">a valid OracleConnection, on which to execute this command</param>
        /// <param name="transaction">a valid OracleTransaction, or 'null'</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters to be associated with the command or 'null' if no parameters are required</param>
        /// <param name="connectionOwnership">indicates whether the connection parameter was provided by the caller, or created by OracleHelper</param>
        /// <returns>OracleDataReader containing the results of the command</returns>
        private static OracleDataReader ExecuteReader(OracleConnection connection, OracleTransaction transaction, CommandType commandType, string commandText, IDbDataParameter[] commandParameters, OracleConnectionOwnership connectionOwnership)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, connection, transaction, commandType, commandText, commandParameters);

            // create a reader
            OracleDataReader dr;

            // call ExecuteReader with the appropriate CommandBehavior
            if (connectionOwnership == OracleConnectionOwnership.External)
            {
                dr = cmd.ExecuteReader();
            }
            else
            {
                dr = cmd.ExecuteReader((CommandBehavior)((int)CommandBehavior.CloseConnection));
            }

            return (OracleDataReader)dr;
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset and takes no parameters) against the database specified in
        /// the connection string.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  OracleDataReader dr = ExecuteReader(connString, CommandType.StoredProcedure, "GetOrders");
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(string connectionString, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteReader(connectionString, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset) against the database specified in the connection string
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  OracleDataReader dr = ExecuteReader(connString, CommandType.StoredProcedure, "GetOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(string connectionString, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create & open an OraclebConnection
            OracleConnection cn = new OracleConnection(connectionString);
            cn.Open();

            try
            {
                // call the private overload that takes an internally owned connection in place of the connection string
                return ExecuteReader(cn, null, commandType, commandText, commandParameters, OracleConnectionOwnership.Internal);
            }
            catch
            {
                // if we fail to return the OracleDataReader, we need to close the connection ourselves
                cn.Close();
                throw;
            }
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a resultset) against the database specified in
        /// the connection string using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  OracleDataReader dr = ExecuteReader(connString, "GetOrders", 24, 36);
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(string connectionString, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populate the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteReader(connectionString, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteReader(connectionString, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset and takes no parameters) against the provided OracleConnection.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  OracleDataReader dr = ExecuteReader(conn, CommandType.StoredProcedure, "GetOrders");
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(OracleConnection connection, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteReader(connection, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset) against the specified OracleConnection
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  OracleDataReader dr = ExecuteReader(conn, CommandType.StoredProcedure, "GetOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(OracleConnection connection, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // pass through the call to the private overload using a null transaction value and an externally owned connection
            return ExecuteReader(connection, (OracleTransaction)null, commandType, commandText, commandParameters, OracleConnectionOwnership.External);
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a resultset) against the specified OracleConnection
        /// using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  OracleDataReader dr = ExecuteReader(conn, "GetOrders", 24, 36);
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(OracleConnection connection, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connection.ConnectionString, spName);

                AssignParameterValues(commandParameters, parameterValues);

                return ExecuteReader(connection, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteReader(connection, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset and takes no parameters) against the provided OracleTransaction.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  OracleDataReader dr = ExecuteReader(trans, CommandType.StoredProcedure, "GetOrders");
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteReader(transaction, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a resultset) against the specified OracleTransaction
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///   OracleDataReader dr = ExecuteReader(trans, CommandType.StoredProcedure, "GetOrders", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or PL/SQL command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(OracleTransaction transaction, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // pass through to private overload, indicating that the connection is owned by the caller
            return ExecuteReader(transaction.Connection, transaction, commandType, commandText, commandParameters, OracleConnectionOwnership.External);
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a resultset) against the specified
        /// OracleTransaction using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  OracleDataReader dr = ExecuteReader(trans, "GetOrders", 24, 36);
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an OracleDataReader containing the resultset generated by the command</returns>
        public static OracleDataReader ExecuteReader(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(transaction.Connection.ConnectionString, spName);

                AssignParameterValues(commandParameters, parameterValues);

                return ExecuteReader(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteReader(transaction, CommandType.StoredProcedure, spName);
            }
        }

        #endregion ExecuteReader

        #region ExecuteScalar

        /// <summary>
        /// Execute an OracleCommand (that returns a 1x1 resultset and takes no parameters) against the database specified in
        /// the connection string.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(connString, CommandType.StoredProcedure, "GetOrderCount");
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-Oracle command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(string connectionString, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteScalar(connectionString, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a 1x1 resultset) against the database specified in the connection string
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(connString, CommandType.StoredProcedure, "GetOrderCount", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-Oracle command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(string connectionString, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create & open an OracleConnection, and dispose of it after we are done.
            using (OracleConnection cn = new OracleConnection(connectionString))
            {
                cn.Open();

                // call the overload that takes a connection in place of the connection string
                return ExecuteScalar(cn, commandType, commandText, commandParameters);
            }
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a 1x1 resultset) against the database specified in
        /// the conneciton string using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(connString, "GetOrderCount", 24, 36);
        /// </remarks>
        /// <param name="connectionString">a valid connection string for an OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(string connectionString, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populet the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteScalar(connectionString, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteScalar(connectionString, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a 1x1 resultset and takes no parameters) against the provided OracleConnection.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(conn, CommandType.StoredProcedure, "GetOrderCount");
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-Oracle command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleConnection connection, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteScalar(connection, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a 1x1 resultset) against the specified OracleConnection
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(conn, CommandType.StoredProcedure, "GetOrderCount", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-OleDb command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleConnection connection, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, connection, (OracleTransaction)null, commandType, commandText, commandParameters);

            // execute the command & return the results
            return cmd.ExecuteScalar();
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a 1x1 resultset) against the specified OracleConnection
        /// using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(conn, "GetOrderCount", 24, 36);
        /// </remarks>
        /// <param name="connection">a valid OracleConnection</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleConnection connection, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populet the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteScalar(connection, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteScalar(connection, CommandType.StoredProcedure, spName);
            }
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a 1x1 resultset and takes no parameters) against the provided OracleTransaction.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(trans, CommandType.StoredProcedure, "GetOrderCount");
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-OleDb command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleTransaction transaction, CommandType commandType, string commandText)
        {
            // pass through the call providing null for the set of IDbDataParameters
            return ExecuteScalar(transaction, commandType, commandText, (IDbDataParameter[])null);
        }

        /// <summary>
        /// Execute an OracleCommand (that returns a 1x1 resultset) against the specified OracleTransaction
        /// using the provided parameters.
        /// </summary>
        /// <remarks>
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(trans, CommandType.StoredProcedure, "GetOrderCount", new IDbDataParameter("@prodid", 24));
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="commandType">the CommandType (stored procedure, text, etc.)</param>
        /// <param name="commandText">the stored procedure name or T-OleDb command</param>
        /// <param name="commandParameters">an array of IDbDataParameters used to execute the command</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleTransaction transaction, CommandType commandType, string commandText, params IDbDataParameter[] commandParameters)
        {
            // create a command and prepare it for execution
            OracleCommand cmd = new OracleCommand();
            PrepareCommand(cmd, transaction.Connection, transaction, commandType, commandText, commandParameters);

            // execute the command & return the results
            return cmd.ExecuteScalar();
        }

        /// <summary>
        /// Execute a stored procedure via an OracleCommand (that returns a 1x1 resultset) against the specified
        /// OracleTransaction using the provided parameter values.  This method will query the database to discover the parameters for the
        /// stored procedure (the first time each stored procedure is called), and assign the values based on parameter order.
        /// </summary>
        /// <remarks>
        /// This method provides no access to output parameters or the stored procedure's return value parameter.
        ///
        /// e.g.:
        ///  int orderCount = (int)ExecuteScalar(trans, "GetOrderCount", 24, 36);
        /// </remarks>
        /// <param name="transaction">a valid OracleTransaction</param>
        /// <param name="spName">the name of the stored procedure</param>
        /// <param name="parameterValues">an array of objects to be assigned as the input values of the stored procedure</param>
        /// <returns>an object containing the value in the 1x1 resultset generated by the command</returns>
        public static object ExecuteScalar(OracleTransaction transaction, string spName, params object[] parameterValues)
        {
            // if we got parameter values, we need to figure out where they go
            if ((parameterValues != null) && (parameterValues.Length > 0))
            {
                // pull the parameters for this stored procedure from the parameter cache (or discover them & populet the cache)
                IDbDataParameter[] commandParameters = OracleHelperParameterCache.GetSpParameterSet(transaction.Connection.ConnectionString, spName);

                // assign the provided values to these parameters based on parameter order
                AssignParameterValues(commandParameters, parameterValues);

                // call the overload that takes an array of IDbDataParameters
                return ExecuteScalar(transaction, CommandType.StoredProcedure, spName, commandParameters);
            }

            // otherwise we can just call the SP without params
            else
            {
                return ExecuteScalar(transaction, CommandType.StoredProcedure, spName);
            }
        }

        #endregion ExecuteScalar
    }
}
