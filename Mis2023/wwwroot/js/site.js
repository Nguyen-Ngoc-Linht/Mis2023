// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function addColumnSearch(table) {

    //thêm ô input search cho từng cột của datatable
    //table phải có thẻ tfoot giống hệt thead
    $('tfoot th').each(function () {
        var title = $(this).text();
        if (title === "")
            return;
        $(this).html(
            '<input type="text" class="form-control" placeholder="Search ' + title + '" />');
    });
    // thêm sự kiện tìm kiếm
    table.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change',
            function () {
                if (that.search() !== this.value) {
                    that.search(this.value)
                        .draw();
                }
            });
    });
    //gán các ô search lên trên
    $('tfoot').each(function () {
        $(this).insertAfter($(this).siblings('thead'));
    });
}
$(function () {
    $(".toggle-password").click(function () {
        $(this).toggleClass("fa-eye-slash");
        const input = $($(this).attr("toggle"));
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
});

function formatNumber(num) {

    if (typeof num === "string")
        num = parseFloat(num);

    if (isNaN(num))
        return "-";

    if (num === Number.POSITIVE_INFINITY || num === Number.NEGATIVE_INFINITY)
        return "-";


    return num === null
        ? ""
        : parseFloat(num.toFixed(2)).toString().replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}