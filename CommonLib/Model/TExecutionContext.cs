﻿using System.Diagnostics;
using System.Text;

namespace CommonLib.Model
{
    /// <summary>
    /// 2019-11-12 10:26:41 ngocta2
    /// </summary>
    public class TExecutionContext
    {
        /// <summary>
        /// 36c4b5db-ab3c-426d-9fc3-53a354796800
        /// 1/3 ; 2/3 ; 3/3
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// key=key_hello, value=hello Trần Anh Ngọc 1/8/2019 5:06:05 PM, duration=43830 mins
        /// </summary>
        public string Data { get; set; }

        /// <summary>
        /// luon la data moi nhat cua LogBuffer
        /// tu day mo duoc value truoc khi vao line bi error
        /// </summary>
        public string LastContext { get; set; }

        //----------------------------

        /// <summary>
        /// prop: full datetime cua thoi diem xay ra event
        /// </summary>
        public string Timestamp { get; set; }

        /// <summary>
        /// prop: thread id cua thread exec code (thread id trong 1 process)
        /// </summary>
        public int ThreadId { get; set; }

        /// <summary>
        /// string thread id
        /// </summary>
        public string ThreadIdS { get; set; }

        /// <summary>
        /// prop: task id cua task exec code (task id trong 1 process)
        /// </summary>
        public int TaskId { get; set; }

        /// <summary>
        /// string task id
        /// </summary>
        public string TaskIdS { get; set; }

        /// <summary>
        /// ten fucntion hien tai
        /// </summary>
        public string FunctionName { get; set; }

        /// <summary>
        /// so luong time da troi qua, ke tu luc run constructor (tao new instance)
        /// </summary>
        public long ElapsedMilliseconds => this._stopwatch.ElapsedMilliseconds;

        /// <summary>
        /// luu string tam thoi, chua write ra file
        /// CHU Y: chua write file nhung xu ly nhieu tai string cung lam giam performance
        /// </summary>
        public StringBuilder Buffer => _sb ?? (_sb = new StringBuilder());

        //----------------------------
        private readonly Stopwatch _stopwatch;

        private StringBuilder _sb;

        /// <summary>
        /// 2019-01-25 08:37:45 ngocta2
        /// constructor tinh toan so luong time exec code
        /// </summary>
        public TExecutionContext()
        {
            this._stopwatch = Stopwatch.StartNew();
        }
    }
}
