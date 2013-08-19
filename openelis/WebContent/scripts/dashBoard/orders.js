
function order(div, orderJson, generateLink, getColumns) {
     this.div = div;
     this.orderArray = JSON.parse(orderJson);
     this.columns = getColumns();
         this.indexesOfNonSearchableColumns = function(){
                var indexes = [];

                jQuery.each(this.columns, function(id, column){
                    
                    //we shouldn't add the id for the column if column.searchable is null.
                    // It assumes that we don't need to specify searchable property when the column is searchable
                    if (column.searchable == false){
                        indexes.push(column.index);
                    }
                });

                return indexes;
             }
    this.orderList = function (){

            if (this.orders) {
                return this.orders;
            }

            this.orders = jQuery.map(this.orderArray, function(order, i) {
                order.id= i;
                order.link = generateLink(order);
                order.name = order.firstName + " " + order.lastName;
                return order;
            });

            return this.orders;
         };
}

function generateLinkForCompletedOrder(order){
    return "<a target='_blank' href='ReportPrint.do?type=patient&report=patientHaitiClinical&accessionDirect="+ order.accessionNumber +"&patientNumberDirect=" + order.stNumber + "'>Print Report</a>";
}

function generateLinkForInProgressOrder(order){
    return "<a target='_blank' href='ResultValidationForAccessionNumber.do?accessionNumber=" + order.accessionNumber + "&type=Validation+By+Accession+Number&test='>Validate</a>";
}

function getColumnsForInProgressOrder() {
     return [
                {id: "accessionNumber", name: "Accession Number", field: "accessionNumber", sortable: true, index:0, editor: Slick.Editors.Text,  minWidth:120},
                {id: "stNumber", name: "PatientID", field: "stNumber", sortable: true, editor: Slick.Editors.Text,  index:1 },
                {id: "name", name: "PatientName", field: "name", sortable: true,  index:2, editor: Slick.Editors.Text,  minWidth:150},
                {id: "pendingTestCount", name: "Pending Tests", field: "pendingTestCount", sortable: true, editor: Slick.Editors.Text,  index:3, searchable: false},
                {id: "validatedTestCount", name: "Validated Tests", field: "validatedTestCount", sortable: true, editor: Slick.Editors.Text,  index:4, searchable: false},
                {id: "totalTestCount", name: "Total Tests", field: "totalTestCount", sortable: true, editor: Slick.Editors.Text,  index:5, searchable: false},
                {id: "source", name: "Source", field: "source", sortable: true,  index:6, editor: Slick.Editors.Text },
                {id: "link", name: "Action", field: "link",  cssClass: "cell-title", formatter: formatter, index:7,editor: Slick.Editors.Text, searchable: false}
         ];
}

function getColumnsForCompletedOrder(){
    return [
        {id: "accessionNumber", name: "Accession Number", field: "accessionNumber", sortable: true, index:0, editor: Slick.Editors.Text,  minWidth:120},
        {id: "stNumber", name: "PatientID", field: "stNumber", sortable: true,  index:1, editor: Slick.Editors.Text },
        {id: "name", name: "PatientName", field: "name", sortable: true,  index:2,  editor: Slick.Editors.Text, minWidth:160},
        {id: "source", name: "Source", field: "source", sortable: true,  index:3, editor: Slick.Editors.Text },
        {id: "link", name: "PrintReport", field: "link",  cssClass: "cell-title", formatter: formatter, index:4, editor: Slick.Editors.Text, searchable: false}
    ];
}

function formatter(row, cell, value, columnDef, dataContext) {
    return value;
}
