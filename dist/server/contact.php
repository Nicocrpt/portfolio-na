<?php 
     if ($_SERVER["REQUEST_METHOD"] === "POST") {
         $nom = htmlspecialchars(trim($_POST['nom']));
         $prenom = htmlspecialchars(trim($_POST['prenom']));
         $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
         $message = htmlspecialchars(trim($_POST['message']));
         $captcha = $_POST['recaptcha_token'];
     
         // Vérification des champs
         if (!$nom || !$prenom || !$email || !$message || !$captcha) {
             echo "<p style='color:red;'>Tous les champs sont obligatoires.</p>";
             exit;
         }
     
         // Vérifier le token reCAPTCHA
         $secretKey = "6Le-gAErAAAAAL-LXt5n_zFEk4KB7ltb4X6xwNt7";
         $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$captcha}");
         $captcha_success = json_decode($response);
     
         // Score recommandé : 0.5 (plus bas = risque de bot)
         if (!$captcha_success->success || $captcha_success->score < 0.5) {
             echo "<p style='color:red;'>Vérification reCAPTCHA échouée.</p>";
             exit;
         }
     }
 
 
     $to = 'carpita.nicolas@gmail.com';
     $from_email = 'contact@nicolas.ifcsioslam.fr';
     $subject = $_POST['nom'] . ' ' . $_POST['prenom'] . ' - ' . $_POST['subject'];
     $message = $_POST['message'];
     $headers = 'From: ' . $_POST['email'] . "\r\n" .
         'Reply-To: ' . $_POST['email'] . "\r\n" .
         'X-Mailer: PHP/' . phpversion();
     $reply_to_email = $_POST['email'];
     $headers = "From: $from_email\r\n" .  // Ton adresse email
     "Reply-To: $reply_to_email\r\n" .  // Permet de répondre à l'expéditeur
     "Content-Type: text/plain; charset=UTF-8\r\n";
 
     if(mail($to, $subject, $message, $headers)) {
         echo 'OK';
         echo "<p style='color:green;'>Votre message a bien été envoyé.</p>";
     } else {
         echo 'KO';
         echo "<p style='color:red;'>Erreur lors de l'envoi du message.</p>";
     }
 ?>