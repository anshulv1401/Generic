<!DOCTYPE HTML>
<?php
	require 'connection.php';
	
	$query = "select noofimages from imageCategory;";
	$arrayResult=executeQuery($query);
	echo '<script>';
	echo 'var noOfImages = '.json_encode($arrayResult).';';
	echo '</script>';
	
	
	$query ="select caption from imageDirectory where ImageCategoryID=(select ImageCategoryID from imageCategory where imagecategoryname = 'People')";
	$arrayResult=executeQuery($query);
	echo '<script>';
	echo 'var captionPeople = '.json_encode($arrayResult).';';
	echo '</script>';
	
	$query ="select caption from imageDirectory where ImageCategoryID=(select ImageCategoryID from imageCategory where imagecategoryname = 'Thing')";
	$arrayResult=executeQuery($query);
	echo '<script>';
	echo 'var captionThing = '.json_encode($arrayResult).';';
	echo '</script>';
	
	$query ="select caption from imageDirectory where ImageCategoryID=(select ImageCategoryID from imageCategory where imagecategoryname = 'Place')";
	$arrayResult=executeQuery($query);
	echo '<script>';
	echo 'var captionPlace = '.json_encode($arrayResult).';';
	echo '</script>';

	function executeQuery($query)
	{
		Global $conn;
		if($conn === null)
		{
			return '';
		}
		else
		{
			$stmt = $conn->prepare($query);
			$products = array();
			if ($stmt->execute()) {
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
					$products[] = $row;
				}
			}
			return $products;
		}
	}
	$conn=null;
?>
<html>
	<head>
		<title>Gallery</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<script src="https://www.w3schools.com/lib/w3.js"></script>
		<script src="assets/js/jquery.min.js"></script>
		<script src="assets/js/jquery.poptrox.min.js"></script>
		<script src="assets/js/jquery.scrolly.min.js"></script>
		<script src="assets/js/skel.min.js"></script>
	</head>
	<body>
		<div class="page-wrap">

			<!-- Nav -->
				<nav id="nav">
					<ul>
						<li><a href="../index.php" ><span class="icon fa-font"></span></a></li>
						<li><a href="index.php" ><span class="icon fa-home"></span></a></li>
						<li><a href="gallery.php" class="active"><span class="icon fa-camera-retro"></span></a></li>
					</ul>
				</nav>

			<!-- Main -->
				<section id="main">

					<!-- Header -->
						<header id="header">
							<div>Snapshot <span>by <a title="Anshul Vanawat" href="../index.php" style="color:#19B5FE;text-decoration:none;" >Anshul vanawat</a></span></div>
						</header>

					<!-- Gallery -->
						<section id="galleries">

							<!-- Photo Galleries -->
								<div class="gallery">

									<!-- Filters -->
										<header>
											<h1>Gallery</h1>
											<ul class="tabs">
												<li><a href="#" data-tag="all" class="button active">All</a></li>
												<li><a href="#" data-tag="people" class="button">People</a></li>
												<li><a href="#" data-tag="place" class="button">Places</a></li>
												<li><a href="#" data-tag="thing" class="button">Things</a></li>
											</ul>
										</header>
										
										
										<div class="content">
											<!-- populated using javascript by gallery.js file-->
											
										</div>
										<div  align="center">
											<a href="#" id="prevButton" class="button">Prev</a>
											 
											<a href="#" id="nextButton" class="button">Next</a>
										</div>
								</div>
						</section>

						<footer w3-include-html="footer.php">
							<script>
								w3.includeHTML();
							</script>
						</footer>
				</section>
		</div>

		<!-- Scripts -->
			<script src="gallery.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>

	</body>
</html>