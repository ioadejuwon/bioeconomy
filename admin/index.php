<?php
session_start();
// Set the session timeout duration (in seconds)
$timeout_duration = 1800;  // 30 minutes
include_once "../inc/config.php";
$pagetitle = "Admin Dashboard";
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
$sql = mysqli_query( $conn, "SELECT * FROM bio_admin WHERE admin_id = '{$admin_id}'" );
$row = mysqli_fetch_assoc( $sql );
$name = $row["first_name"] . " 👋";
$participants = mysqli_query( $conn, "SELECT * FROM bio_participants" );
$totalparticipants = mysqli_num_rows( $participants );
$totalparticipants = ! empty( $totalparticipants ) ? $totalparticipants : "0";

// $abstracts = mysqli_query( $conn, "SELECT * FROM bio_abstracts" );
// $totalabstracts = mysqli_num_rows( $abstracts );
$totalabstracts = ! empty( $totalabstracts ) ? $totalabstracts : "0";
// $nostorereg = mysqli_query( $conn, "SELECT * FROM users LEFT JOIN merchants ON users.unique_id = merchants.unique_id WHERE merchants.unique_id IS NULL" );
// $totalnostorereg = mysqli_num_rows( $nostorereg );
// $links = mysqli_query( $conn, "SELECT * FROM grootlink" );
// $totallinks = mysqli_num_rows( $links );
// $orders = mysqli_query( $conn, "SELECT * FROM orders" );
// $totalorders = mysqli_num_rows( $orders );
// $$AdImgLink = "app-assets/img/ad/ad.gif";


include_once "admin-head.php";
include_once "admin-header.php";
include_once "admin-sidebar.php";
?>
<div class="dashboard__content bg-light-4">
	<div class="row justify-between pb-0 mb-20">
		<div class="col-auto">
			<h1 class="text-27 lh-12 fw-700">Admin Dashboard</h1>
			<div class="breadcrumbs mt-10 pt-0 pb-0">
				<div class="breadcrumbs__content">
					<div class="breadcrumbs__item">
						<a href="">Home</a>
					</div>
					<div class="breadcrumbs__item">
						<a href="<?php echo ADMIN_DASHBOARD ?>">Dashboard</a>
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
	<div class="row y-gap-5" style="--bs-gutter-x:5px !important;">
		<div class="col-xl-6 col-6">
			<div class="d-flex justify-between items-center py-20 px-20 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
				<div>
					<div class="text-24 lh-1 fw-600 text-dark-1 mt-20" id="totalAmount">
						<?php echo $totalparticipants; ?>
					</div>
					<div class="lh-1 fw-500 mt-10">Total Partcipants</div>
					<!-- <div class="lh-1 mt-25"><span class="text-deep-green-1">$50</span> New Sales</div> -->
				</div>
				<!-- <i class="text-35 fa fa-box text-deep-green-1"></i> -->
				<span class="material-symbols-outlined text-30 text-deep-green-1">group</span>
			</div>
		</div>
		<div class="col-xl-6 col-6">
			<div class="d-flex justify-between items-center py-20 px-20 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
				<div>
					<div class="text-24 lh-1 fw-600 text-dark-1 mt-20" id="storeVisits">
						<?php echo $totalabstracts; ?>
					</div>
					<div class="lh-1 fw-500 mt-10">Total Abstracts</div>
					<!-- <div class="lh-1 mt-25"><span class="text-deep-green-1">$50</span> New Sales</div> -->
				</div>
				<!-- <i class="text-40 fa fa-box text-deep-green-1"></i> -->
				<span class="material-symbols-outlined text-30 text-deep-green-1">inventory_2</span>
				<!-- no-big-screen -->
				<!-- lg:d-none -->
			</div>
		</div>
		
	</div>
	<div class="row y-gap-15 pt-10" style="--bs-gutter-x:0px !important;">
		<div class="col-xl-12 col-md-12">
			<div class="">
				<div class="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
					<div class="d-flex justify-between items-center py-20 px-30 border-bottom-ligh">
						<h2 class="text-17 lh-1 fw-500 py-10">Partcipants</h2>
					</div>
					<div class="py- px-30 table-responsive">
						<table class="table  w-1/1" id="productstable">
							<?php
							if ( $totalparticipants != 0 ) {
								?>
								<thead style="background-color: var(--color-light-4); color: var(--color-black) !important;">
									<tr>
										<th style="color: var(--color-black) !important;">Participant ID</th>
										<th style="color: var(--color-black) !important;">FULL NAME</th>
										<th style="color: var(--color-black) !important;">CATEGORY</th>
										<th style="color: var(--color-black) !important;">DATE JOINED</th>
									</tr>
								</thead>
								<tbody>
									<?php
									$newpartcipants = mysqli_query( $conn, "SELECT * FROM bio_participants ORDER BY created_at DESC LIMIT 5 " );
									while ( $row = mysqli_fetch_assoc( $newpartcipants ) ) {
										$first_name = $row['first_name'];
										$last_name = $row['last_name'];
										$fullname = $first_name . ' '. $last_name;
										$user_id = $row['user_id'];
										$countryCode = $row['countryCode'];
										$phonenumber = $row['phoneNo'];
										$fee = $row['fee'];
										if ($fee = 0) {
											$category = "Student";
										}elseif ($fee = 1) {
											$category = "Faculty Members";											
										}elseif ($fee = 2) {
											$category = "Non-Faculty Members";
										}else{
											$category = "No Category";
										}
										// $phonedetails = $row['countryCode'].$row['phoneNo'];
										$phonedetails = $row['phonedetails'];
										$date_joined = $row['created_at'];
										$date = strtotime( $date_joined );
										$dateformat = date( 'D., jS M. \'y', $date );
										?>
										<tr class="product-row">
											<td class="product-name">
												<a href=<?php echo PARTCIPIPANT_DETS.$user_id ?> class="">
													ID <?php echo $user_id ?>
												</a>
											</td>
											<td class="product-price">
												<?php echo $fullname ?>
											</td>
											<td class="product-qty-sold">
												<?php echo $category ?>
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
												No Users yet!
											</h3>
											<p class="pt-10 mb-20">
												When you add products, they will appear here!
											</p>
											<div class="col-md-6 move-center">
												<a href="" class="button -md -deep-green-1 text-white p-0">Add Products</a>
											</div>
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
			<div class=" pt-10">
				<div class="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
					<div class="d-flex justify-between items-center py-20 px-30 border-bottom-ligh">
						<h2 class="text-17 lh-1 fw-500 py-10">Abstracts</h2>
					</div>
					<div class="py- px-30 table-responsive">
						<table class="table w-1/1" id="linkTable">
							<?php
							if ( $totalusers != 0 ) {
								?>
								<thead style="background-color: var(--color-light-4); color: var(--color-black) !important;">
									<tr>
										<th style="color: var(--color-black) !important;">UNIQUE ID</th>
										<th style="color: var(--color-black) !important;">FIRST NAME</th>
										<th style="color: var(--color-black) !important;">LAST NAME</th>
										<th style="color: var(--color-black) !important;" class="lg:d-none">EMAIL ADDRESS</th>
										<th style="color: var(--color-black) !important;" class="lg:d-none">PHONE NUMBER</th>
										<th style="color: var(--color-black) !important;">DATE JOINED</th>
									</tr>
								</thead>
								<tbody>
									<?php
									$newusers = mysqli_query( $conn, "SELECT * FROM users ORDER BY created_at DESC LIMIT 5 " );
									while ( $row = mysqli_fetch_assoc( $newusers ) ) {
										$fname = $row['fname'];
										$lname = $row['lname'];
										$email = $row['email'];
										$unique_id = $row['unique_id'];
										$countryCode = $row['countryCode'];
										$phonenumber = $row['phoneNo'];
										$phonedetails = $row['countryCode'] . $row['phoneNo'];
										$date_joined = $row['created_at'];
										$date = strtotime( $date_joined );
										$dateformat = date( 'D., jS M. \'y', $date );
										?>
										<tr>
										<td class="product-name">
												<a href="?h" class="">
													<?php echo $unique_id ?>
												</a>
											</td>
											<td class="product-price">
												<?php echo $fname ?>
											</td>
											<td class="product-qty-sold">
												<?php echo $lname ?>
											</td>
											<td class="product-price lg:d-none">
												<?php echo $email ?>
											</td>
											<td class="product-qty-sold lg:d-none">
												<?php echo $phonedetails ?>
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
											<img src="assets/img/edit/links.png" style="width:20%">
											<h3 class="px-30 text- fw-500 mt-20">
												You have not added any links!
											</h3>
											<p class="pt-10 mb-20">
												When you add link, they will appear here!
											</p>
											<div class="col-md-6 move-center">
												<a href="<?php echo ' '; ?>" class="button -md -deep-green-1 text-white p-0">Add Links</a>
											</div>
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