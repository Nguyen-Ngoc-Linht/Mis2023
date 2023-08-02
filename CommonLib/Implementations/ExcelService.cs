using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using CommonLib.Interfaces;
using NPOI.SS.Util;
using OfficeOpenXml;

namespace CommonLib.Implementations
{
    public class ExcelService : IExcelService
    {
        /// <summary>
        /// GetColumnsListFromFile : Lấy danh sách tên cột trong file excel chứa giá trị
        /// </summary>
        /// <param name="filePath">Đường dẫn đến thư mục chứa file</param>
        /// <param name="sheetName">Tên sheet</param>
        /// <returns>List<string></returns>
        public IEnumerable<string> GetColumnsListFromFile(string filePath, string sheetName)
        {
            List<string> columnsList = new List<string>();
            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            try
            {
                using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Name == sheetName))
                {
                    foreach (var startRowCell in workSheet.Cells[
                        workSheet.Dimension.Start.Row,
                        workSheet.Dimension.Start.Column,
                        1,
                        workSheet.Dimension.End.Column])
                    {
                        // lấy tên cột A,B,C từ địa chỉ của hàng đầu tiên
                        string columnName = startRowCell.Address;
                        Regex reg = new Regex(@"^[A-Z]+");

                        Match match = reg.Match(columnName);
                        if (match.Length > 0)
                        {
                            columnsList.Add(match.Value);
                        }
                    }
                }

                package.Dispose();
            }
            catch (Exception)
            {
            }

            return columnsList;
        }

        /// <summary>
        /// GetColumnsListFromFileByIndex : Lấy danh sách tên cột trong file excel chứa giá trị
        /// </summary>
        /// <param name="filePath">Đường dẫn đến thư mục chứa file</param>
        /// <param name="idx">Giá trị value ứng với sheet index của file</param>
        /// <returns>List<string></returns>
        public IEnumerable<string> GetColumnsListFromFileByIndex(string filePath, string idx)
        {
            List<string> columnsList = new List<string>();
            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            try
            {
                // Chú ý _index > 0
                int index = Convert.ToInt32(idx) + 1;

                using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Index == index))
                {
                    for (int i = workSheet.Dimension.Start.Column; i < workSheet.Dimension.End.Column + 1; ++i)
                    {
                        if (!workSheet.Column(i).Hidden)
                        {
                            string columnName = workSheet.Cells[1, i].Address;
                            Regex reg = new Regex(@"^[A-Z]+");

                            Match match = reg.Match(columnName);
                            if (match.Length > 0)
                            {
                                columnsList.Add(match.Value);
                            }
                        }
                    }
                }

                package.Dispose();
            }
            catch (Exception)
            {
            }
            finally
            {
                package.Dispose();
            }

            return columnsList;
        }
        // lấy giá trị vĩ mỗ
        public IEnumerable<string> GetColumnsViMo(string filePath, string idx, string range)
        {
            List<string> columnsList = new List<string>();
            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            try
            {
                // Chú ý _index > 0
                int index = Convert.ToInt32(idx) + 1;

                using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Index == index))
                {
                    ExcelRange Rng = workSheet.Cells[range];
                    for (int i = Rng.Start.Column; i < Rng.End.Column + 1; ++i)
                    {
                        string columnName = Rng.Worksheet.Cells[1, i].Address;
                        Regex reg = new Regex(@"^[A-Z]+");

                        Match match = reg.Match(columnName);
                        if (match.Length > 0)
                        {
                            columnsList.Add(match.Value);
                        }
                    }
                }

                package.Dispose();
            }
            catch (Exception)
            {
            }
            finally
            {
                package.Dispose();
            }

            return columnsList;
        }
        /// <summary>
        /// GetColumnsListFromFileByName : Lấy danh sách tên cột trong file excel chứa giá trị
        /// </summary>
        /// <param name="filePath">Đường dẫn đến thư mục chứa file</param>
        /// <param name="sheetName">Tên sheet</param>
        /// <returns></returns>
        public IEnumerable<string> GetColumnsListFromFileByName(string filePath, string sheetName)
        {
            List<string> columnsList = new List<string>();
            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            try
            {
                using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Name == sheetName))
                {
                    for (int i = workSheet.Dimension.Start.Column; i < workSheet.Dimension.End.Column + 1; ++i)
                    {
                        string columnName = workSheet.Cells[1, i].Address;
                        Regex reg = new Regex(@"^[A-Z]+");

                        Match match = reg.Match(columnName);
                        if (match.Length > 0)
                        {
                            columnsList.Add(match.Value);
                        }
                    }
                }

                package.Dispose();
            }
            catch (Exception)
            {
            }

            return columnsList;
        }

        /// <summary>
        /// GetSheetListFromFile : Lấy danh sách Sheet có trong file
        /// </summary>
        /// <param name="filePath">Đường dẫn đến thư mục chưa file</param>
        /// <returns></returns>
        public List<string> GetSheetListFromFile(string filePath)
        {
            var sheetsList = new List<string>();
            var package = new ExcelPackage(new FileInfo(filePath));
            try
            {
                if (package.Workbook.Worksheets.Count < 1)
                {
                    return sheetsList;
                }

                for (var i = 1; i <= package.Workbook.Worksheets.Count; i++)
                {
                    if (package.Workbook.Worksheets[i].Hidden == eWorkSheetHidden.Visible)
                    {
                        sheetsList.Add(package.Workbook.Worksheets[i].Name);
                    }
                }
            }
            catch
            {
            }
            finally
            {
                package.Dispose();
            }

            package.Dispose();
            return sheetsList;
        }

        /// <summary>
        /// một hàng có 1 list giá trị
        /// một bảng có 1 list hàng
        /// một file có 1 list bảng
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns>List<List<List<string>>></returns>
        public List<List<List<string>>> GetDataFromExcelFile(string filePath)
        {
            List<List<List<string>>> sheets = new List<List<List<string>>>();

            try
            {
                ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

                var i = 1;

                foreach (var sheet in package.Workbook.Worksheets)
                {
                    if (package.Workbook.Worksheets[i].Hidden == eWorkSheetHidden.Visible)
                    {
                        // Đọc dữ liệu từng bảng
                        List<List<string>> sheetListString = new List<List<string>>();
                        for (int rowNumber = 1; rowNumber <= sheet.Dimension.End.Row; rowNumber++)
                        {
                            if (!sheet.Row(rowNumber).Hidden)
                            {
                                List<string> rowListString = new List<string>();

                                // Đọc dữ liệu từng dòng
                                var row = sheet.Cells[rowNumber, 1, rowNumber, sheet.Dimension.End.Column];

                                // Lỗi bị mất giá trị -> chuyển sang for cho mỗi dòng đều có giá trị
                                for (var cellIndex = 1; cellIndex <= sheet.Dimension.End.Column; cellIndex++)
                                {
                                    if (!sheet.Column(cellIndex).Hidden)
                                    {
                                        // đọc dữ liệu từng ô
                                        if (string.IsNullOrEmpty(row[rowNumber, cellIndex].Text.Trim()))
                                        {
                                            rowListString.Add(string.Empty);
                                        }
                                        else
                                        {
                                            var cellValue = row[rowNumber, cellIndex].Value;
                                            cellValue = cellValue.ToString() == "0" ? cellValue : row[rowNumber, cellIndex].Text.Trim();

                                            rowListString.Add(cellValue.ToString());
                                        }
                                    }
                                }

                                sheetListString.Add(rowListString);

                                // end sheet
                            }

                        }

                        sheets.Add(sheetListString);
                    }

                    i++;
                }

                package.Dispose();
            }
            catch
            {
                // nếu lỗi trả về rỗng
                sheets = new List<List<List<string>>>();
            }

            return sheets;
        }

        /// <summary>
        /// GetDataInColumn : Lấy danh sách giá trị tại cột lựa chọn
        /// </summary>
        /// <param name="filePath">Đường dẫn đến thư mục chưa file</param>
        /// <param name="sheetName">Tên sheet</param>
        /// <param name="columnIndex">IndexColumn</param>
        /// <returns>List<string></returns>
        public List<string> GetDataInColumn(string filePath, string sheetName, int columnIndex)
        {
            List<string> columnData = new List<string>();
            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Name == sheetName))
            {
                for (int i = 1; i < workSheet.Dimension.End.Row; i++)
                {
                    var cells = workSheet.Cells[1, 1, workSheet.Dimension.End.Row, workSheet.Dimension.End.Column];
                    if (string.IsNullOrEmpty(cells[i, columnIndex].Text.Trim()))
                    {
                        columnData.Add(string.Empty);
                    }
                    else
                    {
                        columnData.Add(cells[i, columnIndex].Value.ToString().Trim());
                    }
                }
            }

            package.Dispose();

            return columnData;
        }

        /// <summary>
        /// GetDataInColumnByIndex : Lấy danh sách giá trị tại cột lựa chọn
        /// </summary>
        /// <param name="filePath">Đường dẫn đến thư mục chưa file</param>
        /// <param name="idx">Giá trị value ứng với sheet index của file</param>
        /// <param name="columnIndex">IndexColumn</param>
        /// <returns>List<string></returns>
        public List<string> GetDataInColumnByIndex(string filePath, string idx, string columnIndex)
        {
            List<string> columnData = new List<string>();
            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            // Chú ý _index > 0
            int index = Convert.ToInt32(idx) + 1;

            using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Index == index))
            {
                var cr = new CellReference(columnIndex);
                var cells = workSheet.Cells[1, 1, workSheet.Dimension.End.Row, workSheet.Dimension.End.Column];
                for (int i = 1; i < workSheet.Dimension.End.Row + 1; i++)
                {
                    if (string.IsNullOrEmpty(cells[i, cr.Col + 1].Text.Trim()))
                    {
                        columnData.Add(string.Empty);
                    }
                    else
                    {
                        columnData.Add(cells[i, cr.Col + 1].Value.ToString().Trim());
                    }
                }
            }

            package.Dispose();

            return columnData;
        }

        public List<string> GetDataInColumnToRowByIndex(string filePath, string idx, int columnIndex, int torowIndex)
        {
            List<string> columnData = new List<string>();
            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            // Chú ý _index > 0
            int index = Convert.ToInt32(idx) + 1;

            using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Index == index))
            {
                var cells = workSheet.Cells[1, 1, workSheet.Dimension.End.Row, workSheet.Dimension.End.Column];
                for (int i = 1; i <= torowIndex; i++)
                {
                    if (string.IsNullOrEmpty(cells[i, columnIndex + 1].Text.Trim()))
                    {
                        columnData.Add(string.Empty);
                    }
                    else
                    {
                        columnData.Add(cells[i, columnIndex + 1].Value.ToString().Trim());
                    }
                }
            }

            package.Dispose();

            return columnData;
        }

        public List<string> GetDataRowByIndex(string filePath, string idx, int columnIndex, int torowIndex)
        {
            List<string> columnData = new List<string>();
            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            // Chú ý _index > 0
            int index = Convert.ToInt32(idx) + 1;

            using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Index == index))
            {
                var cells = workSheet.Cells[1, 1, workSheet.Dimension.End.Row, workSheet.Dimension.End.Column];
                for (int i = 1; i <= torowIndex; i++)
                {
                    if (string.IsNullOrEmpty(cells[columnIndex, i].Text.Trim()))
                    {
                        columnData.Add(string.Empty);
                    }
                    else
                    {
                        columnData.Add(cells[columnIndex, i].Value.ToString().Trim());
                    }
                }
            }

            package.Dispose();

            return columnData;
        }

        /// <summary>
        /// GetDataInColumnFromToByIndex : Lấy danh sách giá trị tại khoảng lựa chọn
        /// </summary>
        /// <param name="filePath">Đường dẫn đến thư mục chưa file</param>
        /// <param name="idx">Giá trị value ứng với sheet index của file</param>
        /// <param name="fromcolumnIndex">Từ cột</param>
        /// <param name="tocolumnIndex">Đến cột</param>
        /// <param name="fromrowIndex">Từ hàng</param>
        /// <param name="torowIndex">Đến hàng</param>
        /// <returns></returns>
        public List<List<string>> GetDataInColumnFromToByIndex(
            string filePath,
            string idx,
            int fromcolumnIndex,
            int tocolumnIndex,
            int fromrowIndex,
            int torowIndex)
        {
            List<List<string>> columnData = new List<List<string>>();

            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));

            // Chú ý _index > 0
            int index = Convert.ToInt32(idx) + 1;

            using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Index == index))
            {
                var cells = workSheet.Cells[1, 1, workSheet.Dimension.End.Row, workSheet.Dimension.End.Column];

                // Lấy từ hàng đến hàng
                int indexarray = fromcolumnIndex;
                for (int iCol = fromcolumnIndex; iCol <= tocolumnIndex; iCol++)
                {
                    List<string> data = new List<string>();
                    for (int iRow = fromrowIndex; iRow <= torowIndex; iRow++)
                    {
                        if (string.IsNullOrEmpty(cells[iRow, iCol].Text.Trim()))
                        {
                            data.Add(string.Empty);
                        }
                        else
                        {
                            data.Add(cells[iRow, iCol].Value.ToString().Trim());
                        }
                    }

                    columnData.Add(data);
                }
            }

            package.Dispose();

            return columnData;
        }

        /// <summary>
        /// GetAllColumnsListFromFile :
        /// Lấy danh sách tất cả các sheet có trong file
        /// Lấy tất cả các cột có dữ liệu có trong sheet
        /// </summary>
        /// <param name="filePath">Đường dẫn đến thư mục chưa file</param>
        /// <returns>List<List<string>></returns>
        public List<List<string>> GetAllColumnsListFromFile(string filePath)
        {
            List<List<string>> sheetDatas = new List<List<string>>();

            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));
            try
            {
                var y = 1;

                foreach (var sheet in package.Workbook.Worksheets)
                {
                    if (package.Workbook.Worksheets[y].Hidden == eWorkSheetHidden.Visible)
                    {
                        List<string> columnsList = new List<string>();
                        using (var workSheet = package.Workbook.Worksheets.SingleOrDefault(x => x.Index == sheet.Index))
                        {
                            for (int i = workSheet.Dimension.Start.Column; i < workSheet.Dimension.End.Column + 1; ++i)
                            {
                                if (!sheet.Column(i).Hidden)
                                {
                                    string columnName = workSheet.Cells[1, i].Address;
                                    Regex reg = new Regex(@"^[A-Z]+");

                                    Match match = reg.Match(columnName);
                                    if (match.Length > 0)
                                    {
                                        columnsList.Add(match.Value);
                                    }
                                }
                            }
                        }

                        sheetDatas.Add(columnsList);
                    }

                    y++;
                }

                package.Dispose();
            }
            catch (Exception e)
            {
            }

            return sheetDatas;
        }
    }
}
