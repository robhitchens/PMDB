/*import jQuery from 'jquery';
import $ from 'jquery';
import jquery from 'jquery';*/
/*import * as $ from 'jquery';
var DataTable = require('datatables.net');
(<any> $.fn).dataTable = DataTable;
(<any> $.fn).dataTable.ext = DataTable.ext;*/
/*(<any> $.fn).dataTableSettings = DataTable.settings;
(<any> $.fn).dataTableExt = DataTable.ext;
DataTable.$ = $;
(<any> $.fn.DataTable) = function(opts){
    return (<any> $(this)).dataTable(opts).api();
};*/
//This doesn't seem accurate.

// @ts-ignore
/*import DataTable from 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-responsive';
import 'datatables.net-responsive-bs';*/

/*(<any> global).$ = $;
(<any> global).jQuery = $;
(<any> global).jquery = $;
(<any> window).contextPath = 'testContext';*/
//TODO below is workaround block for jquery :visible selector?
/*(<any> window).Element.prototype.getClientRects = function() {
    var node = this;
    while(node) {
        if(node === document) {
            break;
        }
        // don't know why but style is sometimes undefined
        if (!node.style || node.style.display === 'none' || node.style.visibility === 'hidden') {
            return [];
        }
        node = node.parentNode;
    }
    var self = jQuery(this);
    return [{width: self.width(), height: self.height()}];
};*/
//global['jquery'] = jQuery;
/*console.log("$", global['$']);
console.log("jQuery", global['jQuery']);
console.log("jquery", global['jquery']);
console.log("$.fn", global['$'].fn);
console.log("$.fn.dataTable", global['$'].fn.dataTable);*/
