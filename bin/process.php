<?php
require_once('class.phpmailer.php'); //Incluimos la clase phpmailer   
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

if ((isset($_POST['tipo'])) && (strlen(trim($_POST['tipo'])) > 0)) {
  $tipo = stripslashes(strip_tags($_POST['tipo']));
} else {$tipo = 'Tipo no seleccionado';}
if ((isset($_POST['nombre'])) && (strlen(trim($_POST['nombre'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['nombre']));
} else {$name = 'Nombre no ingresado';}
if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$email = stripslashes(strip_tags($_POST['email']));
} else {$email = 'Email no ingresado';}
if ((isset($_POST['phone'])) && (strlen(trim($_POST['phone'])) > 0)) {
	$phone = stripslashes(strip_tags($_POST['phone']));
} else {$phone = 'Telefono no ingresado';}
if ((isset($_POST['fotos'])) && (strlen(trim($_POST['fotos'])) > 0)) {
    $fotos = $_POST['fotos'];
} else {$fotos = 'Foto no ingresada';}
if ((isset($_POST['direccion'])) && (strlen(trim($_POST['direccion'])) > 0)) {
  $direccion = stripslashes(strip_tags($_POST['direccion']));
} else {$direccion = 'Dirección no ingresada';}
if ((isset($_POST['fecha'])) && (strlen(trim($_POST['fecha'])) > 0)) {
  $fecha = stripslashes(strip_tags($_POST['fecha']));
} else {$fecha = 'fecha no ingresada';}
if ((isset($_POST['caracteristicas'])) && (strlen(trim($_POST['caracteristicas'])) > 0)) {
    $caracteristicas = stripslashes(strip_tags($_POST['caracteristicas']));
    } else {$caracteristicas = 'Caracteristicas no ingresadas';}
if ((isset($_POST['ropa'])) && (strlen(trim($_POST['ropa'])) > 0)) {
  $ropa = stripslashes(strip_tags($_POST['ropa']));
} else {$ropa = 'Ropa no ingresada';}
if ((isset($_POST['accesorios'])) && (strlen(trim($_POST['accesorios'])) > 0)) {
  $accesorios = stripslashes(strip_tags($_POST['accesorios']));
} else {$accesorios = 'Accesorios no ingresados';}
if ((isset($_POST['observaciones'])) && (strlen(trim($_POST['observaciones'])) > 0)) {
  $observaciones = stripslashes(strip_tags($_POST['observaciones']));
} else {$observaciones = 'Observaciones no ingresados';}

ob_start();
?>
<html>
<head>
<style type="text/css">
</style>
</head>
<body>
<table width="600" border="1" cellspacing="2" cellpadding="2">
  <tr>
    <td bgcolor="#eeeeff">Tipo</td>
    <td width="70%"><?php echo $tipo;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Nombre Completo</td>
    <td width="70%"><?php echo $name;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Correo Electr&oacute;nico</td>
    <td width="70%"><?php echo $email;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Tel&eacute;fono</td>
    <td width="70%"><?php echo $phone;?></td>
  </tr>
   <tr>
    <td bgcolor="#eeeeff">Fotos</td>
    <td width="70%"><?php echo $fotos;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Direccion</td>
    <td width="70%"><?php echo $direccion;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Fecha requerida</td>
    <td width="70%"><?php echo $fecha;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Caracteristicas</td>
    <td width="70%"><?php echo $caracteristicas;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Ropa</td>
    <td width="70%"><?php echo $ropa;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Accesorios</td>
    <td width="70%"><?php echo $accesorios;?></td>
  </tr>
  <tr>
    <td bgcolor="#eeeeff">Observaciones</td>
    <td width="70%"><?php echo $observaciones;?></td>
  </tr>
</table>
</body>
</html>
<?php
$body = ob_get_contents();

$mail = new PHPMailer(); // Declaramos un nuevo correo, el parametro true significa que mostrara excepciones y errores.
    
$mail->IsSMTP(); // Se especifica a la clase que se utilizará SMTP   
     
    try 
    {
        //------------------------------------------------------
        $id= date("ymdHis");     
        $correo_emisor=$email;     //Correo a utilizar para autenticarse      
        $nombre_emisor=$name;               //Nombre de quien envía el correo
        $correo_gmail="CorreoPersonal";//con Gmail o en caso de GoogleApps utilizar con @tudominio.com
        $contrasena="ContraseñaPersonal";          //contraseña de tu cuenta en Gmail        
        $nombre_destino="Sweet Moments";                //Nombre de quien recibe
        //--------------------------------------------------------
        $mail->SMTPDebug  = 1;                     // Habilita información SMTP (opcional para pruebas)
                                                     // 1 = errores y mensajes
                                                     // 2 = solo mensajes
        $mail->SMTPAuth   = true;                  // Habilita la autenticación SMTP
        $mail->SMTPSecure = "ssl";                 // Establece el tipo de seguridad SMTP
        $mail->Host       = "smtp.gmail.com";      // Establece Gmail como el servidor SMTP
        $mail->Port       = 465;                   // Establece el puerto del servidor SMTP de Gmail
        $mail->Username   = $correo_gmail;         // Usuario Gmail
        $mail->Password   = $contrasena;           // Contraseña Gmail
        //A que dirección se puede responder el correo
        $mail->AddReplyTo($correo_emisor, $nombre_emisor);
        //La direccion a donde mandamos el correo
        $mail->AddAddress($correo_destino, $nombre_destino);
        //De parte de quien es el correo
        $mail->SetFrom($correo_emisor, $nombre_emisor);
        //Asunto del correo
        $mail->Subject = (string)$id .': Solicitud de presupuesto de ' .$tipo .' - ' .$nombre_emisor;
        //El cuerpo del mensaje, puede ser con etiquetas HTML
        //$mensaje= $nombre_emisor .' requiere una Solicitud de Presupuesto de Peluche Personalizado <strong>' .$tipo .'</strong><br><br>El detalle de la solicitud se muestra a continuaci&oacute;n:<br><br><strong>Telef&oacute;no de contacto:</strong> ' .(string)$telefono .'<br><strong>Car&aacute;cteristicas:</strong> ' .$caracteristicas. '<br><strong>Ropa:</strong> ' .$ropa. '<br><strong>Accesorios:</strong> ' .$accesorios;   
        
        //$mail->MsgHTML($mensaje);
        $mail->MsgHTML($body);
        
        //Archivos adjuntos
        //$mail->AddAttachment('https://www.filepicker.io/api/file/5qyphbsESPm3XWVXnz9a');      // Archivos Adjuntos
        //Enviamos el correo

        $mail->Send();
        
    }
    catch (phpmailerException $e) 
    {
            echo $e->errorMessage(); //Errores de PhpMailer
    } 
    catch (Exception $e) 
    {
            echo $e->getMessage(); //Errores de cualquier otro tipo.
    }  
//done. redirect to thank-you page.
//header('Location: thank-you.html');
?>
