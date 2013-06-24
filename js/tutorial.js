$(function() 
{
  document.getElementById("submit_btn").disabled=false;
  document.getElementById("submit_btn").value="Enviar";
  $('#loading').hide(); 
  $('.error').hide();
  $('input.text-input').css({backgroundColor:"#efefef"});
  $('input.text-input').focus(function(){$(this).css({backgroundColor:"#FFDDAA"});});
  $('input.text-input').blur(function(){$(this).css({backgroundColor:"#efefef"});});
  $(".button").click(function() 
  {

    $('.error').hide();  
    //VALIDACIONES
    var var_tipo = $("#tipo").val();    
    if (var_tipo == "") 
    {
      $("label#tipo_error").show();
      $("#tipo").focus();
      return false;
    }
		
	  var var_nombre = $("input#nombre").val();    
		if (var_nombre == "") 
    {
      $("label#nombre_error").show();
      $("input#nombre").focus();
      return false;
    }  
    else
    {
      var ret = TestMaxLen(document.getElementById("nombre"), 50);       
      if (!ret)
      {
        return ret;
      }  
    }  

		var var_email = $("input#email").val();
		if (var_email == "") 
    {
      $("label#email_error").show();
      $("input#email").focus();
      return false;
    }
    else
    {
      var ret = TestMail(var_email);
      if (!ret)
      {
        return ret;
      }
    }

		var var_phone = $("input#phone").val();
		if (var_phone == "") 
    {
      $("label#phone_error").show();
      $("input#phone").focus();
      return false;
    }
    else
    {
      var ret = TestMaxLen(document.getElementById("phone"), 25); 
      if (!ret)
      {
        return ret;
      }
    } 

    if (var_tipo=="Mi Clon")
    {      
      var ul = document.getElementById("Gallery");  
      var liNodes = ul.getElementsByTagName("li");     
      var i=liNodes.length;  
      var fotos = $("ul#Gallery").html();
      if (i == 0) 
      {
        $("#btn-upload_error").show();
        $("#btn-upload").focus();
        return false;
      } 
    }

    var var_direccion = $("#direccion").val();
    if (var_direccion == "") 
    {
      $("label#direccion_error").show();
      $("#direccion").focus();
      return false;
    }
    else
    {
      var ret = TestMaxLen(document.getElementById("direccion"), 300); 
      if (!ret)
      {
        return ret;
      }
    } 

    var var_fecha = $("#fecha").val();
    if (var_fecha == "") 
    {
      $("label#fecha_error").show();
      $("#fecha").focus();
      return false;
    }
    else
    {
      var ret = TestMaxLen(document.getElementById("fecha"), 40); 
      if (!ret)
      {
        return ret;
      }
    } 

    if (var_tipo=="Mi Clon")
    {  
      var var_caracteristicas = $("#caracteristicas").val();
      if (var_caracteristicas == "") 
      {
        $("label#caracteristicas_error").show();
        $("#caracteristicas").focus();
        return false;
      }
      else
      {
        var ret = TestMaxLen(document.getElementById("caracteristicas"), 600); 
        if (!ret)
        {
          return ret;
        }
      }
    }

    var var_ropa = $("#ropa").val();
    if (var_ropa == "") 
    {
      $("label#ropa_error").show();
      $("#ropa").focus();
      return false;
    }
    else
    {
      var ret = TestMaxLen(document.getElementById("ropa"), 600); 
      if (!ret)
      {
        return ret;
      }
    }

    var var_accesorios = $("#accesorios").val();
    if (var_accesorios != "") 
    {
      var ret = TestMaxLen(document.getElementById("accesorios"), 600); 
      if (!ret)
      {
        return ret;
      }
    }

    var var_observaciones = $("#observaciones").val();
    if (var_observaciones != "") 
    {      
      var ret = TestMaxLen(document.getElementById("observaciones"), 600); 
      if (!ret)
      {
        return ret;
      }
    }
		
    if (var_tipo=="Mi Clon")
    {  
		  var dataString = 'tipo=' + var_tipo + '&nombre=' + var_nombre + '&email=' + var_email + '&phone=' + var_phone + '&fotos=' + fotos + '&direccion=' + var_direccion + '&fecha=' + var_fecha + '&caracteristicas=' + var_caracteristicas + '&ropa=' + var_ropa + '&accesorios=' + var_accesorios + '&observaciones=' + var_observaciones;
    }
    else
    {
      var dataString = 'tipo=' + var_tipo + '&nombre=' + var_nombre + '&email=' + var_email + '&phone=' + var_phone + '&fotos=' + fotos + '&direccion=' + var_direccion + '&fecha=' + var_fecha + '&ropa=' + var_ropa + '&accesorios=' + var_accesorios + '&observaciones=' + var_observaciones;
    }
	
    document.getElementById("submit_btn").disabled=true;
    document.getElementById("submit_btn").value="Enviando...";
    $('#loading').show();

		$.ajax(
    {
      type: "POST",
      url: "bin/process.php",
      data: dataString,
      success: function() 
      {
        $('#contact_form').html("<img id='checkmark' src='img/sweetmoments.png' /><br><div id='message'></div>");
        $('#message').html("<h2>Mensaje enviado!</h2>")
        .append("<p>Le responderemos en un plazo máximo de 48 horas, gracias.</p>")
        .hide()
        .fadeIn(1500, function() 
        {
          $('#message').append("<img id='checkmark' src='img/check.png' />");
        });
      }
    });

    return false;
	});
});

runOnLoad(function(){$("input#nombre").select().focus();});


function val() 
{
  id = document.getElementById("tipo").value;
  if (id=="Mi Clon")
  {
    $("div#div_fotos").show();
    $("div#div_caracteristicas").show();
  }
  if (id=="Oso")
  {
    $("div#div_fotos").hide();
    $("div#div_caracteristicas").hide();
  }
  if (id=="Chanchito")
  {
    $("div#div_fotos").hide();
    $("div#div_caracteristicas").hide();
  }
}

function TestMaxLen(objValue,objError, strMaxLen)
{   
  var ret = true;    
  $("label#" + objError.id).hide();    
  if (document.getElementById(objValue.id).value.length>strMaxLen)
  {              
    $("label#" + objError.id).show();
    $("input#" + objValue).focus();  
    document.getElementById(objError.id).innerHTML = 'Solo puede ingresar un máximo de ' + strMaxLen + ' caracteres';
    ret = false;
  }      
  return ret;
}

function TestTelf(phone)
{
  var ret = true;
  var splitted = phone.match("^[0-9]+$");
  $("label#phone_error2").hide();
  if (splitted == null)
  {
    $("label#phone_error2").show();
    $("input#phone").focus();
    document.getElementById('phone_error2').innerHTML = 'Formato de Teléfono incorrecto';
    ret = false;
  }      
  return ret;
}

function TestMail(email)
{

  var ret = true;
  //var splitted = email.match("^(.+)@(.+)$");
  var splitted = email.match("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
  $("label#email_error").hide();
  if (splitted == null)
  {
    $("label#email_error").show();
    $("input#email").focus();
    document.getElementById('email_error').innerHTML = 'Formato de correo incorrecto';
    ret = false;
  }
  return ret;   
}
