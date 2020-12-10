var base_url_api = "http://api-restful-django.herokuapp.com/api/"

$( document ).ready(function() {
    loadSolicitations();
});

function loadSolicitations(){
    Swal.showLoading();
    $.ajax({
        url: base_url_api + "solicitation/",
        type: 'GET',
        success: function(data) {
            $("#list-table-body").html('');
            $.each(data, function(i,solicitation){
                var is_approved = !solicitation.is_approved ? "Reprovado" : "Aprovado";
                var limit_credit = solicitation.limit_credit == null ? "-" : solicitation.limit_credit;

                $("#list-table-body").append('<tr class="table-active"> <th scope="row">'+solicitation.name+'</th> <td>'+solicitation.cpf+'</td> <td>'+solicitation.email+'</td> <td>'+solicitation.birth_date+'</td> <td>R$'+solicitation.monthly_income+'</td><td>'+is_approved+'</td><td>'+solicitation.score+'</td><td>'+limit_credit+'</td><td><button type="button" class="btn btn-danger btn-remove" id="'+solicitation.id+'">Remover</button></td> </tr>')
            });
            Swal.close();
        }
    });
    
}

$("#btn-register").click(function(){
    var solicitation = {
        'name': $("#register-modal #name-input").val(),
        'email': $("#register-modal #email-input").val(),
        'cpf': $("#register-modal #cpf-input").val(),
        'birth_date': $("#register-modal #birth_date-input").val(),
        'monthly_income': $("#register-modal #monthly_income-input").val(),
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
                'Criado.',
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

$(document).on('click','.btn-remove', function(){
    removeSolicitation($(this).prop('id'));
});

function removeSolicitation(id){
    Swal.fire({
        title: 'Remover Solicitação?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Remover',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: base_url_api + "solicitation/"+ id + '/',
                type: 'DELETE',
                success: function(result) {
                    Swal.close();
                    clearRegister();
                    Swal.fire(
                        'Removido.',
                        result.msg,
                        'success'
                      ).then(function(){
                        loadSolicitations();
                    });
                }
            });
        }
      })
}



function clearRegister(){
    $("#register-modal #name-input").val('');
    $("#register-modal #email-input").val('');
    $("#register-modal #cpf-input").val('');
    $("#register-modal #birth_date-input").val('');
    $("#register-modal #monthly_income-input").val('');
}
