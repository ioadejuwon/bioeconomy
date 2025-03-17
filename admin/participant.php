<?php
session_start();
// Set the session timeout duration (in seconds)
$timeout_duration = 1800;  // 30 minutes
include_once "../inc/config.php";
$pagetitle = "Users";
include_once "../inc/drc.php";
if ( ! isset( $_SESSION['admin_id'] ) ) {
	header( "location: " . ADMIN_LOGIN . "?url=" . $current_url . "&t=" . $pagetitle );// redirect to login page if not signed in
	exit; // Make sure to exit after sending the redirection header
} else {
	$admin_id = $_SESSION['admin_id'];
	if ( isset( $_SESSION['last_activity'] ) && ( time() - $_SESSION['last_activity'] ) > $timeout_duration ) {
		// Last activity was more than 30 minutes ago, so log out the user
		session_unset();    // Unset all session variables
		session_destroy();  // Destroy the session data
		header( "Location: " . ADMIN_LOGOUT . "?url=" . $current_url );  // Redirect to logout or login page
		exit();
	}
}
$sql = mysqli_query( $conn, "SELECT * FROM admin WHERE unique_id = '{$_SESSION['unique_id']}'" );
$row = mysqli_fetch_assoc( $sql );
$name = $row["fname"] . " 👋";
$users = mysqli_query( $conn, "SELECT * FROM merchants  order by created_at DESC" );
$totalusers = mysqli_num_rows( $users );
// $$AdImgLink = "app-assets/img/ad/ad.gif";
include_once "admin-head.php";
include_once "admin-header.php";
include_once "admin-sidebar.php";
?>
<div class="dashboard__content bg-light-4">
	<div class="row justify-between pb-0 mb-20">
		<div class="col-auto">
			<h1 class="text-27 lh-12 fw-700">Users</h1>
			<div class="breadcrumbs mt-10 pt-0 pb-0">
				<div class="breadcrumbs__content">
					<div class="breadcrumbs__item">
						<a href="index.html">Home</a>
					</div>
					<div class="breadcrumbs__item">
						<a href="<?php echo ADMIN_PARTICIPANTS ?>">Participants</a>
					</div>
				</div>
			</div>
		</div>
		<div class="col-auto">
			<div class="dropdown">
				<button class="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 text-14 lh-12" onclick="togglefilterDropdown()" data-unique-id="<?php echo $unique_id; ?>">
					<span id="dropdownFilter">Filter</span>
					<i class="icon text-9 ml-40 icon-chevron-down"></i>
				</button>
				<div id="filterDropdown" class="dropdown__content -dark-bg-dark-2 -dark-border-white-10" style="display: none;">
					<div>
						<a href="javascript:void(0);" onclick="fetchFiltered('today')" class="d-block">Today</a>
					</div>
					<div>
						<a href="javascript:void(0);" onclick="fetchFiltered('this_week')" class="d-block">This Week</a>
					</div>
					<div>
						<a href="javascript:void(0);" onclick="fetchFiltered('this_month')" class="d-block">This Month</a>
					</div>
					<div>
						<a href="javascript:void(0);" onclick="fetchFiltered('this_year')" class="d-block">This Year</a>
					</div>
					<div>
						<a href="javascript:void(0);" onclick="fetchFiltered('lifetime')" class="d-block">Lifetime</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row y-gap-15 pt-10" style="--bs-gutter-x:0px !important;">
		<div class="col-xl-12 col-md-12">
			<div class="">
				<div class="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
					<div class="d-flex justify-between items-center py-20 px-30 border-bottom-ligh">
						<h2 class="text-17 lh-1 fw-500 py-10">All Users</h2>
						<div class="">
							<div class="dropdown js-dropdown js-category-active d-non">
								<div class="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12" data-el-toggle=".js-category-toggle" data-el-toggle-active=".js-category-active">
									<span class="js-dropdown-title">This Week</span>
									<i class="icon text-9 ml-40 icon-chevron-down"></i>
								</div>
								<div class="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle">
									<div class="text-14 y-gap-15 js-dropdown-list">
										<div><a href="#" class="d-block js-dropdown-link">Animation</a></div>
										<div><a href="#" class="d-block js-dropdown-link">Design</a></div>
										<div><a href="#" class="d-block js-dropdown-link">Illustration</a></div>
										<div><a href="#" class="d-block js-dropdown-link">Business</a></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="py- px-30 table-responsive">
						<table class="table  w-1/1" id="productstable">
							<?php
							if ( $totalusers != 0 ) {
								?>
								<thead style="background-color: var(--color-light-4); color: var(--color-black) !important;">
									<tr>
										<th style="color: var(--color-black) !important;">ID</th>
										<th style="color: var(--color-black) !important;">UNIQUE ID</th>
										<th style="color: var(--color-black) !important;">BRAND NAME</th>
										<th style="color: var(--color-black) !important;">EMAIL ADDRESS</th>
										<th style="color: var(--color-black) !important;">LAST EMAIL SENT</th>
									</tr>
								</thead>
								<tbody>
									<?php
									$num = 0;
									while ( $row = mysqli_fetch_assoc( $users ) ) {
										$brand = $row['brand_name'];
										$email = $row['email'];
										$unique_id = $row['unique_id'];
										$date_joined = $row['last_email_sent'];
										$date = strtotime( $date_joined );
										$dateformat = date( 'D., jS M. \'y', $date );
										$num += 1;
										?>
										<tr class="product-row">
											<td>
											<?php echo "#".$num?>
											</td>
											<td class="product-name">
												<a href="?h" class="">
													<?php echo $unique_id ?>
												</a>
											</td>
											<td class="product-price">
												<?php echo $brand ?>
											</td>
											<td class="product-price">
												<?php echo $email ?>
											</td>
											<td class="product-price">
												<?php echo $dateformat ?>
											</td>
										</tr>
										<?php
									}
									?>
								</tbody>
								<?php
							} else {
								?>
								<tr class="col-md-12 text-center">
									<td colspan="4" class="p-0">
										<div class="py-30 px-30 bg-light-4 rounded-8 border-light col-md-12 move-center">
											<img src="assets/img/edit/store.png" style="width:20%">
											<h3 class=" text- fw-500 mt-20">
												There are no Users
											</h3>
											<p class="pt-10 mb-20">
												When Users join, you will see them here
											</p>
										</div>
									</td>
								</tr>
								<?php
							}
							?>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php
include_once "admin-footer.php";
include_once "admin-tail.php";
?>