<?php
header("Content-type: json/application");
require("connect.php");
require("comands.php");

$q = $_GET['q'];
$params = explode('/', $q);
$method = $_SERVER['REQUEST_METHOD'];

$type = $params[0];
$id = $params[1];

switch($method){
    case 'GET' :
        if($type === 'products'){
            if($id){
                GetProduct($connect, $id);
            }
            else{
                GetProducts($connect);
            }
        }
    break;

    case 'POST':
        if($type === 'products'){
            AddProduct($connect, $_POST);
        }
    break;

    case 'PUT':
        if($type === 'products'){
            if(isset($id)){
                $data = file_get_contents('php://input');
                $data = json_decode($data, true);
                UpdateProduct($connect, $id, $data);
            }
        }
    break;

    case 'DELETE':
        if($type === 'products'){
            if(isset($id)){
                DeleteProduct($connect, $id);
            }
        } 
    break;

}


?>