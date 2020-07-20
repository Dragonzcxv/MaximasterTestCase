<?php
$host = 'localhost'; 
$database = 'maindb'; 
$user = 'root';
$password = 'root';

$link = mysqli_connect($host, $user, $password, $database) or die("Ошибка" . mysqli_error($link));
$getQuery = "SELECT * FROM `messages`";

if(isset($_POST['data'])){
    $data = json_decode($_POST['data']);
    $datatime = date("Y-m-d H:i:s");
    $insertQuery = "INSERT INTO messages VALUES(null, '$data[0]', '$datatime', '$data[2]')";
    mysqli_query($link, $insertQuery) or die("Ошибка " . mysqli_error($link)); 
}

$result = mysqli_query($link, $getQuery) or die("Ошибка " . mysqli_error($link));
$rows = mysqli_fetch_all($result);

echo json_encode($rows);


?>