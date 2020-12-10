var base_url_api = "http://api-restful-django.herokuapp.com/api/"

$("#btn-register").click(function(){
    var solicitation = {
        'name': $("#name-input").val(),
        'email': $("#email-input").val(),
        'cpf': $("#cpf-input").val(),
        'birth_date': $("#birth_date-input").val(),
        'monthly_income': $("#monthly_income-input").val(),
    };
    createSolicitation(solicitation);
});


function createSolicitation(data){
    Swal.showLoading();
    $.ajax({
        url: base_url_api + "solicitation/",
        type: 'POST',
        data: data,
        success: function(result) {
            Swal.close();
            clearRegister();
            Swal.fire(
                'Solicitado.',
                result.msg,
                'success'
              ).then(function(){
                loadSolicitations();
            });
        },
        error: function(result){
            Swal.fire(
                'Erro.',
                result.responseText,
                'error'
              );
        }
    });

}
function clearRegister(){
    $("#name-input").val('');
    $("#email-input").val('');
    $("#cpf-input").val('');
    $("#birth_date-input").val('');
    $("#monthly_income-input").val('');
}
