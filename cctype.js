$(document).ready(function() {

    $("#transactionType").on('change', function(){
        if ($(this).val() === 'CC'){
            console.log('CC');
            $("#ccTypeRadios").prop('hidden', false);
        } else {
            $("#ccTypeRadios input[type='radio']").prop("checked", false);
            $("#ccTypeRadios").prop('hidden', true);
        }
    })
});