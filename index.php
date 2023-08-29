<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Budget</title>
    <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/1140/1140214.png" type="image/png">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="base.css?v=0">
    <link rel="stylesheet" href="budget.css?v=0">
    <!-- *** JQuery *** -->
    <!-- ONLINE -->
    <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
    <!-- OFFLINE -->
<!--     <script src="jquery-3.7.0.min.js"></script> -->

    <!-- *** Bootstrap *** -->
    <!-- ONLINE -->
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
    <!-- OFFLINE -->
<!--     <link rel="stylesheet" href="bootstrap-5.3.1/css/bootstrap.min.css"> -->
<!--     <script src="bootstrap-5.3.1/js/bootstrap.min.js"></script> -->

    <!-- *** FONTAWESOME *** -->
    <!-- ONLINE -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- OFFLINE -->
<!--     <link rel="stylesheet" href="fontawesome/css/all.min.css" /> -->


    <!-- *** COOKIES JS *** -->
    <!-- ONLINE -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script> -->
    <!-- OFFLINE -->
    <!-- <script src="js/js.cookie.min.js"></script> -->

    <!-- <script>
        $(document).ready(function() {
            Cookies.remove("active-now");
            Cookies.set("active-now", "4");
            // alert(Cookies.get("active-now"));
        });
    </script> -->
    <!-- <link rel="manifest" href="manifest.json"> -->

</head>

<body>

    <div class="page-content-wrapper">
        <div class="container-fluid">
            <!-- SUCCESS TOAST -->
            <div class="position-fixed top-0 end-0 p-3 rounded-5" style="z-index: 11">
                <div id="toastAlertUpdate" class="toast hide " role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header text-white bg-success">
                        <i class="fas fa-check-circle"></i>&nbsp;
                        <strong class="me-auto">Operation Success!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body toast-body-success bg-success-subtle text-dark">
                        <strong>Row Updated Successfully.</strong>
                    </div>
                </div>
            </div>
            <!-- Delete TOAST -->
            <div class="position-fixed top-0 end-0 p-3 rounded-5" style="z-index: 11">
                <div id="toastAlertDelete" class="toast hide " role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header text-dark bg-warning">
                        <i class="fas fa-trash-alt"></i>&nbsp;
                        <strong class="me-auto">Row Deleted</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body toast-body-delete text-dark bg-warning-subtle">
                        <strong>Row Deleted Successfully.</strong>
                    </div>
                </div>
            </div>
            <!-- ERROR TOAST -->
            <div class="position-fixed top-0 end-0 p-3 rounded-5" style="z-index: 11">
                <div id="toastAlertError" class="toast hide " role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header text-white bg-danger">
                        <i class="fas fa-exclamation-triangle"></i>&nbsp;
                        <strong class="me-auto">ERROR</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body toast-body-error text-dark bg-danger-subtle">
                        <strong>An error occured! [<span id="error-code">error-0.0</span>] </strong>
                    </div>
                </div>
            </div>

            <!-- MAIN PAGE -->
            <div class="row">

                <div id="totalCredCard" class="col-md-4 mt-2 ">
                    <div class="card card-1 bg-success bg-gradient text-white" style="width: 100%;">
                        <div class="card-header fw-bold">
                            Total Credit
                        </div>
                        <div class="card-body">
                            <p class="card-text"><strong>$ <span id="totalCredit">0,000.00</span></strong></p>
                        </div>
                    </div>
                </div>
                <div id="totalDebCard" class="col-md-4 mt-2">
                    <div class="card card-1 bg-gradient bg-danger text-white" style="width: 100%;">
                        <div class="card-header fw-bold">
                            Total Debit
                        </div>
                        <div class="card-body">
                            <p class="card-text"><strong>$ <span id="totalDebit">0,000.00</span></strong></p>
                        </div>
                    </div>
                </div>



                <div id="" class="col-md-4 mt-2">
                    <div id="remCashCard" class="card card-1 bg-success text-white bg-gradient" style="width: 100%;">
                        <div class="card-header fw-bold">
                            Remaining Cash
                        </div>
                        <div class="card-body">
                            <!-- <h5 class="card-title">Remaining Cash</h5> -->
                            <p class="card-text"><strong>$ <span id="cashLeft">0,000.00</span></strong></p>
                        </div>
                    </div>
                </div>

                <div id="" class="col-md-4 mt-2">
                    <div id="totalCCCard" class="card card-1 bg-info text-dark bg-gradient" style="width: 100%;">
                        <div class="card-header fw-bold">
                            Total Spent on Credit Card
                            <br>
                            <input class="form-check-input cctype" type="radio" name="CCTypeTotal" id="BDORadioTotal">
                            <label class="form-check-label" for="BDORadio">
                                BDO
                            </label>

                            <input class="form-check-input" type="radio" name="CCTypeTotal" id="CITIRadioTotal">
                            <label class="form-check-label" for="BDORadio">
                                CITI
                            </label>
                            <input class="form-check-input" type="radio" name="CCTypeTotal" id="UBGoldRadioTotal">
                            <label class="form-check-label" for="UB-GoldRadio">
                                UB-Gold
                            </label>
                            <input class="form-check-input" type="radio" name="CCTypeTotal" id="UBGetGoRadioTotal">
                            <label class="form-check-label" for="UB-GetGoRadio">
                                UB-GetGo
                            </label>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><strong>$ <span id="totalCreditCard">0,000.00</span></strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- next row -->
            <div class="row">
                <div class="col-md-4 rounded-3 mt-3">
                    <div class="card text-bg-white bg-gradient" id="debitCreditTransaction" style="width: 100%;">
                        <div class="card-Title px-3 pt-3">
                            <h5><b>Debit/Credit Transaction</b></h5>
                        </div>
                        <div class="card-body">
                            <form method="POST">
                                <div class="form-group">
                                    <label for="descriptionOfTransaction">Description:</label>
                                    <input type="text" class="form-control" placeholder="Enter description" name="descriptionOfTransaction" id="descriptionOfTransaction">
                                </div>
                                <div class="form-group">
                                    <label for="amount">Amount:</label>
                                    <input type="number" class="form-control" name="amount" id="amount" placeholder="Enter amount in $">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="transactionType">Type:</label>
                                    <select name="transactionType" id="transactionType" class="form-select">
                                        <option value="Debit" selected>Debit</option>
                                        <option value="Credit">Credit</option>
                                        <option value="CC">CC</option>
                                    </select>
                                </div>

                                <!-- <div class="form-group hidden"> -->
                                <!-- <label for="ccType">Type:</label> -->
                                <!-- <select name="ccType" id="ccType" class="form-select">
                                        <option value="BDO">BDO</option>
                                        <option value="CITI">CITI</option>
                                        <option value="UBGetGo" selected>UB-GetGo</option>
                                        <option value="UBGold" selected>UB-Gold</option>
                                    </select> -->
                                <!-- </div> -->

                                <div id="ccTypeRadios" hidden>
                                    <div class="form-check">
                                        <input class="form-check-input cctype" type="radio" name="CCType" id="BDORadio">
                                        <label class="form-check-label" for="BDORadio">
                                            BDO
                                        </label>

                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="CCType" id="CITIRadio">
                                        <label class="form-check-label" for="BDORadio">
                                            CITI
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="CCType" id="UBGoldRadio">
                                        <label class="form-check-label" for="UB-GoldRadio">
                                            UB-Gold
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="CCType" id="UBGetGoRadio">
                                        <label class="form-check-label" for="UB-GetGoRadio">
                                            UB-GetGo
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group mt-2">
                                    <label for="transactionDate">Date:</label>
                                    <div class="input-group">
                                        <input type="date" name="transactionDate" id="transactionDate" class="form-control">
                                        &nbsp;
                                        <!-- <div class="form-check align-middle text-center">
                                            <input class="form-check-input" type="checkbox" value="" id="isDateForgotten">
                                            <label class="form-check-label" for="isDateForgotten" id="labelForisDateForgotten">
                                                Forgot Date
                                            </label>
                                        </div> -->
                                    </div>
                                    <small class="text-muted">Default date is today.</small>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <button type="button" class="btn btn-primary mt-2 rounded-1" id="submitTransaction">Submit</button>
                                        <div class="d-flex align-items-center justify-content-center">

                                            <div class="">
                                                <span id="submittedText" class="hidden my-2 h3 text-success"><strong>&nbsp;Submitted</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-8 pb-3 rounded-3 mt-3">
                    <div class="card bg-white bg-gradient text-dark" id="transactionTable" style="width: 100%;">
                        <div class="card-Title px-3 pt-3">
                            <h3><b>Transaction Log</b>
                                <a target="_blank" href="export.php">
                                    <img id="csvicon" class="rounded" src="csv.png" alt="Export to CSV" title="Export to CSV" width="24px">
                                </a>
                                <!-- <button class="btn btn-primary btn-sm" id="exportBtn" title="Export transaction log into CSV"><i class="fas fa-file-csv"></i></button></h3> -->

                        </div>
                        <div class="card-body">
                            <div class="table-responsive rounded-top">
                                <!-- <button class="btn btn-primary" id="export">Export to CSV</button> -->
                                <label for="search" class="">Search Transaction Here</label>
                                <input type="text" title="" class="form-control mb-2" id="search" placeholder="Search">
                                <table id="transaction-table" class="table table-sm table-bordered caption-top">
                                    <thead class="table-dark align-middle text-center  ">
                                        <tr>
                                            <th scope="col" class="header">Transaction Information</th>
                                            <!-- <th scope="col" class="header operation-col" id="operation-header" colspan="2">Operation</th> -->
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <!-- CREATE TABLE FOR TRANSACTION -->
                                        <tr class="no-records-row text-center table-danger">
                                            <td colspan="6" class="'no-records-row text-center table-danger'">
                                                No records in database.
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODALS -->
    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Delete Row</h5>
                    <button type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Do you want to delete <span id="deleteDateSpan" class="text-danger fw-bold rowDate"></span>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger confirmDel-btn" id="confirmDel-btn-id">Delete</button>
                    <button type="button" id="cancelDelete" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update Confirmation Modal -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateModalLabel">Update Row</h5>
                    <button type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Do you want to update <span id="updateDateSpan" class="text-danger fw-bold rowDate"></span>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning confirmUpdate-btn" id="confirmUpdate-btn-id">Update</button>
                    <button type="button" class="btn btn-primary" id="cancelUpdate" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <script src="budget.js"></script>
    <!-- <script src="export.js"></script> -->
    <script src="cctype.js"></script>
</body>

</html>
