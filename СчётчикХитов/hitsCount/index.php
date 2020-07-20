<?php

require_once 'connection.php';

$link = mysqli_connect($host, $user, $password, $database) or die("Ошибка" . mysqli_error($link));

$query = "SELECT count FROM signscount";
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
$datatime = date("H:i");
if($result){
    $row = mysqli_fetch_row($result);
    if($row[0]){
        $newcount = $row[0] + 1;
        $queryUpdate = "UPDATE signscount SET count=$newcount WHERE id = '1'";
        mysqli_query($link, $queryUpdate) or die("Ошибка " . mysqli_error($link));
        echo "Страница была загружена $newcount раз. Текущее время " . $datatime;
   
    }
    else {
        echo "тут";
        $createCountQuery = "INSERT INTO signscount VALUES(null, 1)";
        mysqli_query($link, $createCountQuery) or die("Ошибка " . mysqli_error($link));
        echo "Страница была загружена 1 раз. Текущее время " . $datatime;
    }

    mysqli_free_result($result);
}
else{
    echo "Нет";
}

mysqli_close($link);
