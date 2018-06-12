<!-- Contact -->
	<section id="contact">
		<!-- Social -->
			<div class="social column">
				<h3>About Me</h3>
				<p>I am 23 yr old, software engineer at Technoforte,bangalore. Apart from writing and debugging codes, I wish to share my life.</p>
				<p>I am not much of a talker or a writer, I am an introvert and a little extrovert too. I write codes and I love it. This website is one of my efforts to go beyond that.</p>
				<h3>Follow Me</h3>
				<ul class="icons">
					<li><a href="https://linkedin.com/in/anshul-vanawat/" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
					<li><a href="https://wwww.facebook.com/anshul.vanawat.7" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
					<li><a href="https://www.instagram.com/anshulv1401/" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
					<li><a href="https://plus.google.com/+anshulvanawat" class="icon fa-google-plus"><span class="label">Google+</span></a></li>
				</ul>
			</div>

		<!-- Form -->
			<div class="column">
				<h3>Get in Touch</h3>
				<form action="#" method="post">
					<div class="field half first">
						<label for="name">Name</label>
						<input name="name" id="name" type="text" placeholder="Name" required=""></input>
					</div>
					<div class="field half">
						<label for="email">Email</label>
						<input name="email" id="email" type="email" placeholder="Email" required=""></input>
					</div>
					<div class="field">
						<label for="message">Message</label>
						<textarea name="message" id="message" rows="6" placeholder="Message" required=""></textarea>
					</div>
					<ul class="actions">
						<li><input value="Email" class="button" type="submit"></input></li>
					</ul>
				</form>
			</div>
<?php
	if(isset($_REQUEST['Email'])){
		
		$admin_email="anshulv1401@gmail.com";
		$name=$_REQUEST['Name'];
		$subject='Generic gallery visitor email';
		$email=$_REQUEST['Email'];
		$message=$_REQUEST['Message'];
		
		//mail($admin_email, "$subject",'name '+$name+'\n message '+$message, "From:" . $email);
	}
?>

	</section>