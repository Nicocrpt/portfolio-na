<?php 
    $to = 'carpita.nicolas@gmail.com';
    $subject = $_POST['nom'] . ' ' . $_POST['prenom'] . ' - ' . $_POST['subject'];
    $message = $_POST['message'];
    $headers = 'From: ' . $_POST['email'] . "\r\n" .
        'Reply-To: ' . $_POST['email'] . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    if(mail($to, $subject, $message, $headers)) {
        echo 'OK';
    } else {
        echo 'KO';
    }
?>