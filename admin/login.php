<?php
session_start();
include_once "../inc/config.php";
include_once "../inc/drc.php";
$url = $_GET['url'];
$pagetitle = $_GET['t'];
if ( empty( $_GET['t'] ) ) {
	$pagetitle = "Login";
}
if ( isset( $_SESSION['admin_id'] ) ) {
	header( "location: " . ADMIN_DASHBOARD );
}
include_once "admin-head.php";
include_once "admin-auth-head.php";
?>
<div class="form-page__content lg:py-120" style="margin: 0% auto !important;">
	<div class="container" >
		<div class="row justify-center items-center"  >
			<div class="col-xl-8 col-lg-8">
				<div class="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
					<img src="fav.png" alt="MartVille Logo" class="no-big-screen mb-30" width="15%">
					<h3 class="text-30 lh-13">Admin Login</h3>
					<!-- <p class="mt-10">Don't have an account yet? <a href="<?php echo SIGNUP ?>" class="text-deep-green-1 underline">Sign up for free</a></p> -->
					<?php
					$passwordupdate = $_GET['p'];
					if ( $passwordupdate ) {
						?>
						<div class="col-12 mt-10 mb-10">
							<div class="items-center justify-between bg-success-1 pl-30 pr-20 py-20 rounded-8">
								<div class=" text-success lh-1 fw-500">Password Updated!</div>
								<div class=" text-success lh-1 fw-500 mt-10">Go ahead and login now.</div>
							</div>
						</div>
						<?php
					}
					?>
					<form id="loginForm" class="input-form row y-gap-20 mt-20" method="POST" action="#">
						<div class="col-12">
							<label class="text-16 lh-1 fw-500 text-dark-1 mb-10">Email Address</label>
							<input type="text" class="form-control" name="email" placeholder="Email Address" required>
							<input type="hidden" class="form-control" name="url" placeholder="" value="<?php echo ! empty( $_GET['url'] ) ? $_GET['url'] : ADMIN_DASHBOARD ?>">
						</div>
						<div class="mb-16">
							<label class="text-16 lh-1 fw-500 text-dark-1 mb-">Password</label>
							<div class="input-group">
								<input type="password" name="pword" placeholder="Enter Password" class="form-control" id="loginPassword" style="height:50px;" required>
								<span class="input-group-text" onclick="Pass()" id="loginPasswordicon">
									<i class='fa-regular fa-eye-slash'></i>
								</span>
							</div>
						</div>
						<!-- <p class="mt- fw-500"><a href="<?php echo 'c'; ?>" class="text-deep-green-1">Forgot Password? </a></p> -->
						<div class="col-12">
							<button type="submit" name="login" id="submit" class="button -md -deep-green-1 text-white fw-500 w-1/1">
								Login
							</button>
						</div>
					</form>
					<div class="lh-12 text-dark-1 fw-500 text-center mt-20 d-none">Or sign in using</div>
					<div class="d-flex x-gap-20 items-center justify-between pt-20 ">
						<div class="d-none"><button class="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">Log In via Facebook</button></div>
						<div class="d-none"><button class="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">Log In via Google+</button></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</section>
<script src="api/auth.js"></script>
<?php include_once "admin-tail.php"; ?>