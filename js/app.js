function Clasificator(variables){

    var domainname = 'http://127.0.0.1/:5000/';
    var serverurl = domainname + variables;
    
    var response = $.ajax(
        {   type: 'GET',
            data: {},
            url: serverurl
        }
     );

        response.then(data=>{
        console.log(data)
        return data
        })

}

function CreateUser(params, Clasificator) {
var domainname = 'http://localhost';
    var token = 'cb93da3aa79f850cc243833300373266';
    var functionname = 'core_user_create_users';
    var serverurl = domainname + '/webservice/rest/server.php' ;
    
    //add params into data
    var userstocreate = [{ 
                            username: params.user,
                            password: params.password,
                            firstname: params.name,
                            lastname: params.lastname,
                            email: params.email,
                            auth: 'manual',
                            idnumber: 'testidnumber1',
                            lang: 'es',
                            timezone: 'Pacific/Port_Moresby',
                            mailformat: 0,
                            description: 'Curso Capacitación en Framework de Salud Sexual y Reproductiva',
                            city: 'Popayan',
                            country: 'Colombia',
                         }
                     ];
    var data = {
                wstoken: token,
                wsfunction: functionname,
                moodlewsrestformat: 'json',
                users: userstocreate
                }
    var response = $.ajax(
                            {   type: 'POST',
                                data: data,
                                url: serverurl
                            }
                         );
   
    response.then(data=>{
        console.log(data)
        RegistarUsu(data[0],Clasificator);
    })
    

} 
var variables="";
var datavalue={};
$(document).ready(function() {
   $('#enviar').click(function(){ 
       datavalue["name"]=$("#name").val();
       datavalue["user"]=$("#user").val();
       datavalue["lastname"]=$("#lastname").val();
       datavalue["password"]=$("#password").val();
       datavalue["email"]=$("#email").val();
       $('input').each(function(){
            if (this.checked) {
               datavalue[$(this).attr("name")]=$(this).val()
              variables=variables+ ","+ $(this).val()
            }
      }); 
      var result= Clasificator(variables);  
      if (datavalue != {}) 
          CreateUser(datavalue,result)
      else
            alert('Debes seleccionar al menos una opción.');

      return false;
   });  
});


   //New Function
    function RegistarUsu(user, clasificar){

    var domainname = 'http://localhost';
    var token = '09e24acc01bd696567c4fef12acd7524';
    var functionname = 'enrol_manual_enrol_users';
    var serverurl = domainname + '/webservice/rest/server.php' ;

    var enrollUser = [{roleid: '1', userid:user.id , courseid :parseInt(clasificar.classification+1)}]
    
    var data = {
        wstoken: token,
        wsfunction: functionname,
        moodlewsrestformat: 'json',
        enrolments: enrollUser
    }
    var response = $.ajax(
                    {
                    type: 'POST',
                    data: data,
                    url: serverurl
                    }
                        );
    console.log(response);
    
}





