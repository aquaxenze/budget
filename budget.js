$(document).ready(function () {
    $("#search").on("keyup", function () {
        $(".no-results-row").remove();
        var value = $(this).val().toLowerCase();
        var hasResults = false;

        $("#transaction-table .transaction-row").each(function () {
            var found = false
            $(this).find(".valueCells").each(function () {
                var inputValue = $(this).val().toLowerCase();
                // Check if the input value is a date
                if ($(this).attr("type") === "date") {
                    var inputDate = new Date(inputValue);
                    inputValue = inputDate.toLocaleDateString(); // Format the date to match the table date format
                }

                if (inputValue.indexOf(value) > -1) {
                    found = true;
                    hasResults = true;
                    return false; // Exit the inner loop early if a match is found
                }
            });
            $(this).toggle(found);
        });
        if (!hasResults) {
            $("#transaction-table").append("<tr class='no-results-row '><td colspan='2' class='text-center table-danger'>No results found.</td></tr>");
        } else {
            $(".no-results-row").remove();

        }
    });

    // Function to send data to PHP file using AJAX
    var parsedResponse;
    function getTransaction() {
        // HANDLES THE TABLE LAYOUT
        var handleTableLayout = function (maxWidth) {
            $('table tbody').empty();
            $.each(parsedResponse.transactions, function (index, transaction) {
                var row = $('<tr>').addClass('transaction-row');
                var information = $('<td>').addClass('py-2');

                // CREATE INPUT FIELDS THAT CONTAINS THE INFORMATION OF THE TRANSACTION
                var createInputField = function (label, value, type, isHidden) {
                    // FOR THE TRANSACTION TYPE [CREDIT, DEBIT]
                    if (type === 'select') {
                        var inputField = $('<div>').addClass('input-group').append(
                            // LABEL OF THE INPUT
                            $('<div>').addClass('input-group-prepend').append(
                                $('<span>').addClass('input-group-text fw-bold').text(label).css('width', '125px')
                            ),
                            //  ASSIGNING ATTRIBUTES TO THE SELECT ELEMENT 
                            $('<select>').attr({
                                id: value + '-' + transaction.id,
                                disabled: true,
                                class: value + 'Text form-select valueCells',
                                form: 'transactionForm'
                            }).append(
                                // APPEND OPTIONS DEBIT/CREDIT
                                $('<option>').val('Debit').text('Debit'),
                                $('<option>').val('Credit').text('Credit'),
                                $('<option>').val('CC').text('CC'),
                            ).val(transaction[value])
                        ).prop('hidden', isHidden);
                    }

                    else {
                        var inputField = $('<div>').addClass('input-group').append(
                            // LABEL OF THE INPUT
                            $('<div>').addClass('input-group-prepend').append(
                                $('<span>').addClass('input-group-text fw-bold').text(label).css('width', '125px')
                            ),
                            // ASSIGNING ATTRIBUTES TO THE INPUT ELEMENT
                            $('<input>').attr({
                                id: value + '-' + transaction.id,
                                disabled: true,
                                class: value + 'Text form-control valueCells',
                                value: transaction[value],
                                type: type
                            })
                        ).prop('hidden', isHidden);

                    }


                    return inputField;

                };
                // APPEND THE TRANSACTION INFORMATION TO THE TABLE
                information.append(
                    createInputField('ID:', 'id', 'hidden', true),
                    createInputField('Description:', 'description', 'text', false),
                    createInputField('Amount: $', 'amount', 'number', false),
                    createInputField('Type:', 'type', 'select', false),
                    createInputField('Date:', 'dateOfTransaction', 'date', false),
                    createInputField('Created at:', 'createdAt', 'text', true),
                    createInputField('Updated at:', 'updatedAt', 'text', true)
                );
                var createTransactionButton = function (type, title, className, id, label, icon, hidden) {
                    var button = $('<button>').attr({
                        type: type,
                        title: title,
                        class: className,
                        id: id,
                        hidden: hidden
                    }).html('<i class="fas fa-' + icon + '"></i> ' + label);

                    if (label === 'Delete') {
                        button.attr({
                            'data-bs-toggle': 'modal',
                            'data-bs-target': '#deleteModal'
                        })
                    }
                    else if (label === 'Save') {
                        button.attr({
                            'data-bs-toggle': 'modal',
                            'data-bs-target': '#updateModal'
                        })
                    }
                    return button;
                }

                // Append the operational buttons below the information (In short for Narrow screen widths)
                // if the screen width is below 767px
                // if (maxWidth == 767) {
                //     information.append(
                //         $('<div>').addClass('text-center mt-2').append(
                //             createTransactionButton('button', 'Edit Transaction', 'btn btn-primary editButton', 'editBtn-' + transaction.id, 'Edit', 'edit', false),
                //             $('<span>').html('&nbsp;'),
                //             createTransactionButton('button', 'Delete Transaction', 'btn btn-danger deleteButton', 'deleteBtn-' + transaction.id, 'Delete', 'trash-alt', false),
                //             createTransactionButton('button', 'Update transaction', 'btn btn-warning saveButton', 'savetBtn-' + transaction.id, 'Save', 'save', true),
                //             $('<span>').html('&nbsp;'),
                //             createTransactionButton('button', 'Cancel Transaction', 'btn btn-primary cancelButton', 'cancelBtn-' + transaction.id, 'Cancel', 'ban', true)
                //         )
                //     );
                //     row.append(information);
                // }
                // // Append the operational in another column (In short for wider screen widths)
                // else {
                //     console.log('768')
                //     var operationBtn = $('<td>').addClass('text-center align-middle operation-btn operation-col').append(
                //         $('<div>').addClass('d-grid gap-1').append(
                //             createTransactionButton('button', 'Edit Transaction', 'btn btn-primary editButton', 'editBtn-' + transaction.id, 'Edit', 'edit', false),
                //             createTransactionButton('button', 'Delete Transaction', 'btn btn-danger deleteButton', 'deleteBtn-' + transaction.id, 'Delete', 'trash-alt', false),
                //             createTransactionButton('button', 'Update transaction', 'btn btn-warning saveButton', 'savetBtn-' + transaction.id, 'Save', 'save', true),
                //             createTransactionButton('button', 'Cancel Transaction', 'btn btn-primary cancelButton', 'cancelBtn-' + transaction.id, 'Cancel', 'ban', true)
                //         )
                //     );
                //     row.append(information, operationBtn);
                // }

                // if (mediaQuery == 'portrait') {
                //     console.log('')
                // }

                information.append(
                    $('<div>').addClass('text-center mt-2').append(
                        createTransactionButton('button', 'Edit Transaction', 'btn btn-primary editButton', 'editBtn-' + transaction.id, 'Edit', 'edit', false),
                        $('<span>').html('&nbsp;'),
                        createTransactionButton('button', 'Delete Transaction', 'btn btn-danger deleteButton', 'deleteBtn-' + transaction.id, 'Delete', 'trash-alt', false),
                        createTransactionButton('button', 'Update transaction', 'btn btn-warning saveButton', 'savetBtn-' + transaction.id, 'Save', 'save', true),
                        $('<span>').html('&nbsp;'),
                        createTransactionButton('button', 'Cancel Transaction', 'btn btn-primary cancelButton', 'cancelBtn-' + transaction.id, 'Cancel', 'ban', true)
                    )
                );
                row.append(information);
                // else {
                //     var operationBtn = $('<td>').addClass('text-center align-middle operation-btn operation-col').append(
                //         $('<div>').addClass('d-grid gap-1').append(
                //             createTransactionButton('button', 'Edit Transaction', 'btn btn-primary editButton', 'editBtn-' + transaction.id, 'Edit', 'edit', false),
                //             createTransactionButton('button', 'Delete Transaction', 'btn btn-danger deleteButton', 'deleteBtn-' + transaction.id, 'Delete', 'trash-alt', false),
                //             createTransactionButton('button', 'Update transaction', 'btn btn-warning saveButton', 'savetBtn-' + transaction.id, 'Save', 'save', true),
                //             createTransactionButton('button', 'Cancel Transaction', 'btn btn-primary cancelButton', 'cancelBtn-' + transaction.id, 'Cancel', 'ban', true)
                //         )
                //     );
                //     row.append(information, operationBtn);
                // }

                $('table tbody').append(row);

            });

        }

        // var getMaxWidth = function () {
        //     var maxWidth;
        //     alert('Max Width Triggered');
        //     console.log('getMaxWidth');
        //     // Set the maxWidth based on the window width
        //     // This is for the responsiveness of the OPERATIONAL BUTTONS
        //     if (windowWidth <= 767) {
        //         maxWidth = 767;
        //     } else if (windowWidth >= 768) {
        //         maxWidth = 768;
        //     }
        //     return maxWidth;
        // }
        // var windowWidth = $(window).width();
        // var maxWidth = getMaxWidth(windowWidth);

        var mediaQuery = window.matchMedia("(orientation:portrait)");
        var handleOrientationChange = function () {
            console.log('Handle Orientation Change Function');
            if (mediaQuery.matches) {
                console.log('Portrait');
                handleTableLayout(mediaQuery);
            } else {
                console.log('Landscape');
                handleTableLayout(mediaQuery);
            }
        };

        // Get the Transaction Log from the database
        $.ajax({
            url: 'calculator.php',
            method: 'GET',
            success: function (response) {
                parsedResponse = JSON.parse(response);
                var hasError = parsedResponse.error;
                var transactions, totalCredit, totalDebit, remainingCash;
                if (hasError === false) {
                    transactions = parsedResponse.transactions;
                    totalCredit = parsedResponse.totalCredit;
                    totalDebit = parsedResponse.totalDebit;
                    totalCreditCard = parsedResponse.totalCreditCard;
                    remainingCash = totalCredit - totalDebit;

                } else {
                    console.log('error');
                    transactions = 'No record in database.';
                    totalCredit = 0;
                    totalDebit = 0;
                    remainingCash = 0;

                    var errorCode = parsedResponse.errorCode;
                    // console.log('Error occurred while sending data to PHP file.');
                    $("#error-code").text(errorCode);
                    var toast = new bootstrap.Toast(toastAlertError);
                    toast.show();

                    console.log(parsedResponse.errorMsg);
                }

                // change the background of the remaining cash card based on the remaining cash
                if (remainingCash > 750) {
                    $("#remCashCard").removeClass('bg-warning bg-danger').addClass('bg-success');
                } else if (remainingCash > 50 && remainingCash < 750) {
                    $("#remCashCard").removeClass('bg-success bg-danger').addClass('bg-warning');
                } else {
                    $("#remCashCard").removeClass('bg-success bg-warning').addClass('bg-danger');
                }

                $("#totalCredit").text(totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 }));
                $("#totalDebit").text(totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 }));
                $("#totalCreditCard").text(totalCreditCard.toLocaleString(undefined, { minimumFractionDigits: 2 }));
                $("#cashLeft").text(remainingCash.toLocaleString(undefined, { minimumFractionDigits: 2 }));
                if (transactions.includes('No record in database.')) {
                    // Clear the existing table body
                    $('table tbody').empty();

                    // Create a single row with the "No records in database" message
                    var noRecordsRow = $('<tr>').addClass('no-records-row text-center table-danger');
                    var noRecordsTd = $('<td>').attr('colspan', 2).text('No records in databases.');
                    noRecordsRow.append(noRecordsTd);
                    $('table tbody').append(noRecordsRow);
                    return;
                } else if (transactions.includes('error')) {
                    console.log('error in sql');
                }

                // $(window).on('resize', function () {
                //     windowWidth = $(window).width();
                //     maxWidth = getMaxWidth(windowWidth)
                //     handleTableLayout(maxWidth);
                // });

                mediaQuery.addListener(handleOrientationChange);
                handleOrientationChange(mediaQuery);

                // $(window).on('resize', function () {
                //     handleOrientationChange(mediaQuery);
                // });

                // $(window).on('orientationchange', function(){
                //     var windowOrientaion = window.orientation;
                //     console.log('orientation change', windowOrientaion);
                // });




            },
            error: function (xhr, status, error) {
                console.log('Error occurred while sending data to PHP file.');
                $("#error-code").text(response);
                const toast = new bootstrap.Toast(toastAlertError);
                toast.show();
            }
        });

    }

    // TODO: INPUT BECOMES DISABLED AND BUTTON DISAPPEARS WHEN RESIZING WINDOW WIDTH
    var prevValues = {};
    const toastAlertError = $("#toastAlertError");
    const toastAlertDelete = $("#toastAlertDelete");
    const toastAlertUpdate = $("#toastAlertUpdate");

    function handleButtonClick(row, enableEditing, operation) {
        // GET THE ID OF THE ELEMENTS IN THE SAME ROW
        // INPUTS
        var descriptionID = row.find('.descriptionText').attr('id');
        var amountID = row.find('.amountText').attr('id');
        var typeID = row.find('.typeText').attr('id');
        var dateOfTransactionID = row.find('.dateOfTransactionText').attr('id');
        // BUTTONS
        var editButtonID = row.find('.editButton').attr('id');
        var deleteButtonID = row.find('.deleteButton').attr('id');
        var saveButtonID = row.find('.saveButton').attr('id');
        var cancelButtonID = row.find('.cancelButton').attr('id');
        // ELEMENTS
        // INPUTS
        var description = $("#" + descriptionID);
        var amount = $("#" + amountID);
        var type = $("#" + typeID);
        var dateOfTransaction = $("#" + dateOfTransactionID);
        // BUTTONS
        var editBtn = $("#" + editButtonID);
        var deleteBtn = $("#" + deleteButtonID);
        var saveBtn = $("#" + saveButtonID);
        var cancelBtn = $("#" + cancelButtonID);

        description.prop('disabled', !enableEditing);
        amount.prop('disabled', !enableEditing);
        type.prop('disabled', !enableEditing);
        dateOfTransaction.prop('disabled', !enableEditing);

        var inputIds = [descriptionID, amountID, typeID, dateOfTransactionID];


        var hideButton = function (enableEditing) {
            editBtn.prop('hidden', enableEditing);
            deleteBtn.prop('hidden', enableEditing);
            saveBtn.prop('hidden', !enableEditing);
            cancelBtn.prop('hidden', !enableEditing);
        };
        if (enableEditing === true) {
            for (var i = 0; i < inputIds.length; i++) {
                var inputId = inputIds[i];
                prevValues[inputId] = $("#" + inputId).val();
            }
            hideButton(enableEditing);
        } else if (enableEditing === false && operation != 'cancel') {
            if (operation === 'update') {
                hideButton(enableEditing);
            }
            else if (operation === 'delete') {
                hideButton(enableEditing);
            }
        }
        else {
            for (var i = 0; i < inputIds.length; i++) {
                var inputId = inputIds[i];
                $('#' + inputId).val(prevValues[inputId]);
                delete prevValues[inputId];
            }
            hideButton(enableEditing);
        }
    }
    $(document).on('click', '.editButton', function () {
        var row = $(this).closest('tr'); // Get the closest row element
        handleButtonClick(row, true, 'edit');
    });

    // Cancel Button
    $(document).on('click', '.cancelButton', function () {
        var row = $(this).closest('tr');
        handleButtonClick(row, false, 'cancel');
    });

    // GET THE VALUES OF THE ROW FUNCTION
    function getRowValues(row) {
        var rowidID = row.find('.idText').attr('id');
        var descriptionID = row.find('.descriptionText').attr('id');
        var amountID = row.find('.amountText').attr('id');
        var typeID = row.find('.typeText').attr('id');
        var dateOfTransactionID = row.find('.dateOfTransactionText').attr('id');
        // Return the values as an object
        return {
            idCellVal: $("#" + rowidID).val(),
            descriptionCellVal: $("#" + descriptionID).val(),
            amountCellVal: $("#" + amountID).val(),
            typeCellVal: $("#" + typeID).val(),
            dateOfTransactionCellVal: $("#" + dateOfTransactionID).val()
        };
    }

    // UPDATE TRANSACTION ROW
    function updateRow(row, type) {
        // console.log('sentToPHP function');
        var rowValues = getRowValues(row);
        var idCellVal = rowValues.idCellVal;
        var descriptionCellVal = rowValues.descriptionCellVal;
        var amountCellVal = rowValues.amountCellVal;
        var typeCellVal = rowValues.typeCellVal;
        var dateOfTransactionCellVal = rowValues.dateOfTransactionCellVal;
        $.ajax({
            url: "calculator.php",
            method: "POST",
            data: {
                operation: type,
                id: idCellVal,
                description: descriptionCellVal,
                amount: amountCellVal,
                type: typeCellVal,
                dateOfTransaction: dateOfTransactionCellVal
            },
            success: function (response) {
                // console.log(response);
                if (response === 'updated') {
                    $("#updateModal").modal('hide');
                    const toast = new bootstrap.Toast(toastAlertUpdate);
                    toast.show();
                    getTransaction();

                }
                else if (response === 'deleted') {
                    $("#deleteModal").modal('hide');
                    const toast = new bootstrap.Toast(toastAlertDelete);
                    toast.show();
                    getTransaction();
                }
                else {
                    $(".modal").modal('hide');
                    $("#error-code").text(response);
                    const toast = new bootstrap.Toast(toastAlertError);
                    toast.show();
                }
            },
            error: function (xhr, status, error) {
                console.log('Error occurred while sending data to PHP file.');
                $("#error-code").text(response);
                const toast = new bootstrap.Toast(toastAlertError);
                toast.show();
            }
        })


    }

    // SPAN OF TOAST ALERT
    function textToSpan(row, type) {
        if (type === 'delete') {
            var modalSpan = $('#deleteDateSpan');
        } else if (type === 'save') {
            var modalSpan = $('#updateDateSpan');
        }
        var descriptionID = row.find('.descriptionText').attr('id');
        var transactionID = row.find('.idText').attr('id');
        // console.log(descriptionID, transactionID);
        var descriptionVal = $("#" + descriptionID).val();
        var transID = $("#" + transactionID).val();
        // console.log(descriptionVal, transID);
        var textToSpan = descriptionVal + " [" + transID + "]";
        modalSpan.text(textToSpan);

        $("#confirmUpdate-btn-id").click(function () {
            updateRow(row, type);
        });
        $("#confirmDel-btn-id").click(function () {
            updateRow(row, type);
        });
        $("#cancelUpdate, #cancelDelete").click(function () {
            handleButtonClick(row, false, 'cancel');
        });
    }

    $(document).on('click', '.saveButton', function () {
        var row = $(this).closest('tr');
        textToSpan(row, 'save');

    });
    $(document).on('click', '.deleteButton', function () {
        var row = $(this).closest('tr');
        textToSpan(row, 'delete');
    })



    getTransaction();

    // Submit Transaction to Transaction Log
    const descriptionInput = $("#descriptionOfTransaction");
    const amountInput = $("#amount");
    const typeSelect = $("#transactionType");

    const dateInput = $("#transactionDate");
    const submitTransactionBtn = $("#submitTransaction");
    const originalText = submitTransactionBtn.text();

    // GET THE CURRENT DATE TO THE dateInput element
    var currDate = new Date();
    var year = currDate.getFullYear();
    var month = (currDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currDate.getDate().toString().padStart(2, '0');
    var formattedDate = year + '-' + month + '-' + day;

    // SET THE CURRENT DATE TO THE dateInput ELEMENT
    dateInput.val(formattedDate);


    // INPUT IN THE DATABSE (RADIO)
    // Submit Transaction
    submitTransactionBtn.click(function () {
        var descriptionValue = descriptionInput.val();
        var amountValue = amountInput.val();
        var typeValue = typeSelect.val();

        // GET THE VALUE OF THE SELECTED RADIO
        // Find the checked radio button inside the specified container
        var selectedRadio = $("#ccTypeRadios input[name='CCType']:checked");

        if (selectedRadio.length > 0) {
            // Get the value of the selected radio button
            var selectedValue = selectedRadio.val();
            alert("Selected value: " + selectedValue);
        } else {
            alert("No radio button selected.");
        }


        var dateValue = dateInput.val();
        var operation = 'add';
        

        // 
        // Check if any required field is empty
        var missingFields = [];
        if (descriptionValue === '') {
            missingFields.push('Description');
            descriptionInput.addClass('shake-animation bg-danger bg-gradient');
        }
        if (amountValue === '') {
            missingFields.push('Amount');
            amountInput.addClass('shake-animation bg-danger bg-gradient');
        }
        if (typeValue === null) {
            missingFields.push('Transaction Type');
            typeSelect.addClass('shake-animation bg-danger bg-gradient');
        }
        if (dateValue === '') {
            missingFields.push('Date');
            dateInput.addClass('shake-animation bg-danger bg-gradient');
        }

        // Display alert if any fields are missing
        if (missingFields.length > 0) {
            var missingFieldsMsg = 'Please fill in the following required fields:\n';
            missingFieldsMsg += missingFields.join(', ');
            // Remove the shaking animation after a certain duration
            setTimeout(function () {
                descriptionInput.removeClass('shake-animation bg-danger');
                amountInput.removeClass('shake-animation bg-danger');
                typeSelect.removeClass('shake-animation bg-danger');
                dateInput.removeClass('shake-animation bg-danger');
            }, 1000);
            return; // Stop further execution
        }

        var initialWidth = submitTransactionBtn.width();
        $.ajax({
            url: "calculator.php",
            method: 'POST',
            data: {
                description: descriptionValue,
                amount: amountValue,
                type: typeValue,
                dateOfTransaction: dateValue,
                isForgotten: isForgottenValue,
                operation: operation
            },
            success: function (response) {
                if (response != 'added') {
                    // console.log(response);
                    $("#error-code").text(response);
                    const toast = new bootstrap.Toast(toastAlertError);
                    toast.show();
                    return;
                }
                submitTransactionBtn.width(initialWidth);
                submitTransactionBtn.removeClass('btn-primary').addClass('btn-success');
                $("#submittedText").removeClass('hidden');
                submitTransactionBtn.html("<i class='fas fa-check-circle'></i>");
                submitTransactionBtn.prop('disabled', true);


                setTimeout(function () {
                    submitTransactionBtn.removeClass('btn-success').addClass('btn-primary');
                    submitTransactionBtn.html(originalText);
                    descriptionInput.val('');
                    amountInput.val('');
                    submitTransactionBtn.prop('disabled', false);
                    $("#submittedText").addClass('hidden');
                    typeSelect.val('Debit');
                    $("#descriptionOfTransaction").focus();
                }, 1000); // Adjust the duration as needed


                getTransaction();
            },
            error: function (xhr, status, error) {
                console.log('An error occurred while sending data to PHP file. - ' + error);
                $("#error-code").text(response);
                const toast = new bootstrap.Toast(toastAlertError);
                toast.show();
            }
        });
    });
});

