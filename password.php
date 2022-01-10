<?php 
    if (isset($_POST["sLevel"]) && isset($_POST["pwLength"])) {
        $securityLevel = $_POST["sLevel"];
        $length = $_POST["pwLength"];
        $uppercase = "ABCDEFGHKLMNOPRSTUVWXYZ";
        $lowercase = "abcdefghiklmnoprstuvwxyz";
        $number = "0123456789";
        $specialChar = "$%&/()=?}{@#*+!";
        switch ($securityLevel) {
            case '1':
                $passwordList = str_split($lowercase . $uppercase);
                break;
            case '2':
                $passwordList = str_split($lowercase . $number);
                break;
            case '3':
                $passwordList = str_split($lowercase . $uppercase . $number);
                break;
            case '4':
                $passwordList = str_split($lowercase . $uppercase . $number . $specialChar);
                break;
        }
        $password = "";
        for ($i = 0; $i < $length; $i++) {
            $password .= $passwordList[array_rand($passwordList)];
        }
        echo "<p id='password' style='display: flex; align-items: center; justify-content: center; width: 100%; color: white;'>" . $password . "</p>";
        //echo "<input type='text' id='password' disabled value='" . $password . "' style='display: flex; align-items: center; justify-content: center; width: 100%; color: black; background-color: #e3e3e3; border: none; font-size: 15px;'>";
    }
    else{
        echo "<p>Bitte füllen Sie alle Felder aus!<p>";
    }
?>