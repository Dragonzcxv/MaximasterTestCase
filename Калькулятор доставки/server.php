<?php
$filename = 'cities.txt';


if(isset($_POST['data'])){
    $data = json_decode($_POST['data']);
    $cSession = curl_init(); 
    curl_setopt($cSession,CURLOPT_URL,"http://exercise.develop.maximaster.ru/service/delivery/?city=$data[0]&weight=$data[1]");
    curl_setopt($cSession,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($cSession,CURLOPT_HEADER, false); 
    $result=curl_exec($cSession);
    curl_close($cSession);
    echo $result;
}
else{
    if(file_exists($filename)){
        if(date("d", filectime($filename) == date("d"))){
            echo file_get_contents($filename);
        }
        else{
            UpdateFile($filename);
            echo file_get_contents($filename);
        }
    }
    else{
        UpdateFile($filename);
        echo file_get_contents($filename);
    }
}


function UpdateFile($name){

    $data = file_get_contents("http://exercise.develop.maximaster.ru/service/city/");
    $handler = fopen($name, "w");
    fwrite($handler, $data);

}

?>