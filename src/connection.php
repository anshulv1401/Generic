<?php
	$host="localhost";
	$user="id2786657_anshv1401";
	$password="mynameisAj";
	$db_name="id2786657_generic";
	try{
		$conn = new PDO('mysql:host='.$host.';dbname='.$db_name, $user, $password);
	}
	catch (PDOException $e) 
	{
	}
?>
