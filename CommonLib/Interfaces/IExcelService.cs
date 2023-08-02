using System.Collections.Generic;

namespace CommonLib.Interfaces
{
    public interface IExcelService
    {
        IEnumerable<string> GetColumnsListFromFile(string filePath, string sheetName);

        IEnumerable<string> GetColumnsListFromFileByIndex(string filePath, string idx);

        IEnumerable<string> GetColumnsListFromFileByName(string filePath, string sheetName);

        List<string> GetSheetListFromFile(string filePath);

        IEnumerable<string> GetColumnsViMo(string filePath, string idx, string range);

        List<List<List<string>>> GetDataFromExcelFile(string filePath);

        List<List<string>> GetAllColumnsListFromFile(string filePath);

        List<string> GetDataInColumn(string filePath, string sheetName, int columnIndex);

        List<string> GetDataInColumnByIndex(string filePath, string idx, string columnIndex);

        List<string> GetDataInColumnToRowByIndex(string filePath, string idx, int columnIndex, int torowIndex);
        List<string> GetDataRowByIndex(string filePath, string idx, int columnIndex, int torowIndex);

        List<List<string>> GetDataInColumnFromToByIndex(string filePath, string idx, int fromcolumnIndex, int tocolumnIndex, int fromrowIndex, int torowIndex);
    }
}
