<?php

function GetProducts($connect){
    $products = mysqli_query($connect, "SELECT * FROM products");
    $result = mysqli_fetch_all($products);
    echo json_encode($result);
}

function GetProduct($connect, $id){
    $product = mysqli_query($connect, "SELECT * FROM products WHERE id = '$id'");
    if(mysqli_num_rows($product) === 0){
        http_response_code(404);
        $answer = [
            "status" => false,
            "message" => "Product not found"
        ];
        echo json_encode($answer);
    }
    else{
        echo json_encode(mysqli_fetch_assoc($product));
    }
}

function AddProduct($connect, $data){
    $name = $data['name'];
    $description = $data['description'];
    $price = $data['price'];
    mysqli_query($connect, "INSERT INTO products VALUES (NULL, '$name', '$description', '$price')");

    http_response_code(201);
    $answer = [
        "status" => true,
        "product_id" => mysqli_insert_id($connect)
    ];

    echo json_encode($answer);
}


function UpdateProduct($connect, $id, $data){
    $name = $data['name'];
    $description = $data['description'];
    $price = $data['price'];
    $result = mysqli_query($connect, "UPDATE `products` SET `name` = '$name', `decsription` = '$description', `price` = '$price' WHERE `products`.`id` = '$id'");
    
    $answer = [];

    if($result === false){
        http_response_code(404);
        $answer = [
            "status" => false,
            "product_id" => "Product is not updated"
        ];
    }
    else{
        http_response_code(200);
        $answer = [
            "status" => true,
            "product_id" => "Product is updated"
        ];
    }
    echo mysqli_error($connect);
    echo json_encode($answer);
}


function DeleteProduct($connect, $id){

    $result = mysqli_query($connect, "DELETE FROM products WHERE `products`.`id` = '$id'");
    $answer = [];

    if($result === false){
        http_response_code(404);
        $answer = [
            "status" => false,
            "product_id" => "Product is not deleted"
        ];
    }
    else{
        http_response_code(200);
        $answer = [
            "status" => true,
            "product_id" => "Product is deleted"
        ];
    }

    echo json_encode($answer);
}

?>
