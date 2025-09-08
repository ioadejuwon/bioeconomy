<?php
session_start();
// Set the session timeout duration (in seconds)
$timeout_duration = 1800;  // 30 minutes
include_once "../inc/config.php";
$pagetitle = "Abstracts";
include_once "../inc/drc.php";

$uriSegments = explode( "/", parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ) );
$inventorycode = $uriSegments[ 3 ];
$v = mysqli_real_escape_string( $conn, $inventorycode );


if (! isset($_SESSION['admin_id'])) {
	header("location: " . ADMIN_LOGIN . "?url=" . $current_url . "&t=" . $pagetitle); // redirect to login page if not signed in
	exit; // Make sure to exit after sending the redirection header
} else {
	$admin_id = $_SESSION['admin_id'];
	if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $timeout_duration) {
		// Last activity was more than 30 minutes ago, so log out the user
		session_unset();    // Unset all session variables
		session_destroy();  // Destroy the session data
		header("Location: " . ADMIN_LOGOUT . "?url=" . $current_url);  // Redirect to logout or login page
		exit();
	}
}


$brand_pic = ABSTRACTS_URL . $row['brand_pic'];

include_once "admin-head.php";
include_once "admin-header.php";
include_once "admin-sidebar.php";
?>


<div class="dashboard__content bg-light-4">
	<?php

	$get_categories = $_GET['c'];
	if ( isset( $_GET['c'] ) & strlen( $get_categories ) > 0 ) {
		$querycategory = "SELECT * FROM categories WHERE unique_id = '{$unique_id}'  AND categoryID = '{$get_categories}'";
		$categoryget = mysqli_query( $conn, $querycategory );
		$rowcategory = mysqli_fetch_assoc( $categoryget );

		$category_name = $rowcategory['categoryName'];
		$category_id = $rowcategory['categoryID'];
		?>


		<div class="row mb-10">
			<div class="col-auto">
				<h1 class="text-27 lh-12 fw-600"><?php echo $category_name . " Category"; ?></h1>
				<div class="mt-10">
					Manage this category here
				</div>
			</div>
		</div>

		<div class="row y-gap-30">
			<div class="col-12">
				<div class="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
					<div class="tabs -active-purple-2 js-tabs">
						<div class="tabs__controls d-flex items-center py-20 px-30 border-bottom-light js-tabs-controls">
							<button class="text-light-1 lh-12 tabs__button js-tabs-button is-active" data-tab-target=".-tab-item-1" type="button">
								All Products
							</button>
							<button class="text-light-1 lh-12 tabs__button js-tabs-button ml-30" data-tab-target=".-tab-item-2" type="button">
								<!-- Finished -->
							</button>
							<button class="text-light-1 lh-12 tabs__button js-tabs-button ml-30" data-tab-target=".-tab-item-3" type="button">
								<!-- Not enrolled -->
							</button>
						</div>

						<div class="tabs__content py-30 px-30 js-tabs-content">
							<div class="tabs__pane -tab-item-1 is-active">
								<?php
								$productsquery = "SELECT * FROM prodcatalogue WHERE unique_id = '{$unique_id}' AND category = '{$category_id}'  ORDER BY created_at DESC";
								$productsresult = mysqli_query( $conn, $productsquery );
								$count_row = mysqli_num_rows( $productsresult );
								if ( $count_row != 0 ) {

									?>
									<div class="row y-gap-10 justify-between">
										<div class="col-auto">
											<form class="search-field border-light rounded-8 h-50" action="">
												<input class="bg-white -dark-bg-dark-2 pr-50" type="text" placeholder="Search products">
												<button class="" type="submit">
													<i class="icon-search text-light-1 text-20"></i>
												</button>
											</form>
										</div>

										<div class="col-auto">
											<div class="d-flex flex-wrap y-gap-10 x-gap-20">
												<div>

													<div class="dropdown js-dropdown js-category-active">
														<div class="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-2 border-light rounded-8 px-20 py-10 text-14 lh-12" data-el-toggle=".js-category-toggle" data-el-toggle-active=".js-category-active">
															<span class="js-dropdown-title">Categories</span>
															<i class="icon text-9 ml-40 icon-chevron-down"></i>
														</div>

														<div class="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle">
															<div class="text-14 y-gap-15 js-dropdown-list">
																<div><a href="#" class="d-block js-dropdown-link">Animation</a>
																</div>
															</div>
														</div>
													</div>

												</div>
												<div>

												</div>
											</div>
										</div>
									</div>

									<div class="row y-gap-30 pt-30">

										<?php


										while ( $row_prod = mysqli_fetch_assoc( $productsresult ) ) {
											$product_name = $row_prod['ptitle'];
											$product_id = $row_prod['prod_id'];
											$image_alt = $row_prod['prod_id'];
											$price = $row_prod['pprice'];
											$dis_price = $row_prod['ppricedis']; // Assuming the column name for the discounted price is 'discounted_price'
											$original_price = '&#8358;' . number_format( $price );
											$discounted_price = '&#8358;' . number_format( $dis_price );


											// Get the thumbnail image
											// $pimgsquery = "SELECT * FROM productimages WHERE prod_id = '{$prod_id}'";
											$prodsql_img_thumbnail = mysqli_query( $conn, "SELECT * FROM productimages WHERE prod_id = '$product_id' " );
											$row_prod_img_thumbnail = mysqli_fetch_assoc( $prodsql_img_thumbnail );
											$image_path_thumbnail = ABSTRACTS_URL . $row_prod_img_thumbnail['img'];

											// Get the non-thumbnail images
											$prodsql_img = mysqli_query( $conn, "SELECT * FROM productimages WHERE prod_id = '$product_id'" );
											$other_images = [];
											while ( $row_prod_img = mysqli_fetch_assoc( $prodsql_img ) ) {
												$other_images[] = ABSTRACTS_URL . $row_prod_img['img'];
											}
											?>


											<div class="w-1/4 xl:w-1/3 lg:w-1/2 sm:w-1/2">
												<div class="productCard -type-1 text-center">
													<div class="productCard__image">
														<div class="ratio ratio-63:57">
															<img class="absolute-full-center rounded-8" src="<?php echo $image_path_thumbnail; ?>" alt="<?php echo $product_name ?>">
														</div>
														<div class="productCard__controls z-3">
															<a href="#" class="productCard__icon">
																<i class="fa-regular fa-send"></i>
															</a>
															<a data-barba href="<?php echo $image_path_thumbnail; ?>" class="gallery__item js-gallery productCard__icon" data-gallery="<?php echo $product_id ?>">
																<i class="fa-regular fa-eye"></i>
															</a>

															<a href="<?php echo   '?productid=' . $product_id ?>" class=" productCard__icon">
																<i class="fa-solid fa-trash-can"></i>
															</a>
														</div>
													</div>
													<div class="productCard__content mt-20">
														<!-- <h4 class="text-17 fw-500 mt-15"><?php echo $product_name; ?></h4> -->
														<h4 class="text-17 fw-500 mt-15 no-big-screen">
															<?php
															// echo $product_name; 
															if ( strlen( $product_name ) > 13 ) {
																echo substr( $product_name, 0, 13 ) . '...';
															} else {
																echo $product_name;
															}
															?>
														</h4>
														<h4 class="text-17 fw-500 mt-15 lg:d-none">
															<?php
															echo $product_name;
															?>
														</h4>
														<div class="text-17 fw-500 text-deep-green-1 mt-15">
															<span class="line-through opac-50 text-14"><?php echo $discounted_price; ?></span>
															<?php echo $original_price; ?>
														</div>
													</div>
												</div>

												<?php foreach ($other_images as $image_path) : ?>
													<a data-barba href="<?php echo $image_path; ?>" class="gallery__item js-gallery " data-gallery="<?php echo $product_id ?>"></a>
												<?php endforeach; ?>
											</div>

											<?php
										}
										?>
									</div>
									<?php
								} else {
									?>
									<div class="col-md-12 text-center">
										<img src="https://martville.app/web/assets/img/edit/store.png" style="width:15%">
										<div class="py-30 bg-light-4 rounded-8 border-light col-md-8 mt-50 mb-50" style="margin: 0% auto;">
											<h3 class="px-30 text- fw-500">
												There are no products in this category.
											</h3>
											<p class="pt-10">
												Items you add to cart will be displayed here.<br> Please add items from our store page.
											</p>
										</div>
									</div>

									<?php
								}
								?>

							</div>

							<div class="tabs__pane -tab-item-2"></div>
							<div class="tabs__pane -tab-item-3"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<?php

	} else {


		?>


		<div class="row mb-10">
			<div class="col-auto">
				<h1 class="text-27 lh-12 fw-600">All Categories</h1>
				<div class="mt-10">
					Manage your Categories here
				</div>
			</div>
		</div>


		<div class="row y-gap-30">
			<div class="col-xl-12 col-md-12">
				<div class="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
					<div class="d-flex items-center py-20 px-30 border-bottom-light">
						<h2 class="text-17 lh-1 fw-500">Add Product Category</h2>
					</div>
					<div class="py-30 px-30">
						<form class="contact-form row y-gap-30" id="categoryForm" method="POST">

							<div class="col-md-12 col-12" id="error-message">
								<label class="text-16 lh-1 fw-500 text-dark-1 mb-10">Category Name <span class="text-error-1">*</span> </label>
								<input type="text" name="categoryname" id="category" placeholder="Enter the name of the category" required>
							</div>
							<input type="hidden" name="biz_id" value="<?php echo $biz_id; ?>">
							<input type="hidden" name="unique_id" value="<?php echo $unique_id; ?>">

							<div class="col-md-12 col-12 items-end">
								<button class="button -md -deep-green-1 text-white" type="submit" id="submit">
									Add Category
								</button>
							</div>
						</form>

					</div>

				</div>
			</div>
		</div>

		<div class="row y-gap-30 pt-30">
			<div class="col-xl-12 col-md-12">
				<div class="rounded-16 text-white shadow-4 h-100">

					<div class="table-responive">
						<table class="table w-100">
							<thead>
								<tr>
									<th>Category Name</th>
									<th>No. of Businesses</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody id="categoryTableBody">
								<?php

								$categorysquery = "SELECT * FROM admin_categories ORDER BY categoryName ";
								$categoryresult = mysqli_query( $conn, $categorysquery );



								while ( $row = mysqli_fetch_assoc( $categoryresult ) ) {
									$category_name = $row['categoryName'];
									$category_id = $row['categoryID'];
									$unique_id = $row['unique_id'];


									$category_catalogue_query = "SELECT * FROM merchants WHERE brand_category = '{$category_name}'";
									$category_catalogue_result = mysqli_query( $conn, $category_catalogue_query );
									$count_row_category_catalogue_search = mysqli_num_rows( $category_catalogue_result );


									?>
									<tr data-id="<?php echo $category_id; ?>">
										<td class="underline">
											<a href="<?php echo  "?c=" . $category_name ?>" class="category-name"><?php echo $category_name ?></a>
										</td>
										<td>
											<?php echo $count_row_category_catalogue_search ?>
										</td>
										<td class="dropdown">
											<span class="material-symbols-outlined">more_horiz</span>
											<div class="dropdown-content">
												<a data-toggle="modal" data-target="#edit-<?php echo $category_id; ?>">Edit Category</a>
												<a data-toggle="modal" data-target="#copy-<?php echo $category_id; ?>">Copy Category link</a>
												<a data-toggle="modal" data-target="#delete-<?php echo $category_id; ?>">Delete</a>
											</div>
										</td>
									</tr>


									<!-- Modal -->
									<div class="modal fade edit-modal" id="edit-<?php echo $category_id; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
										<div class="modal-dialog modal-dialog-centered" role="document">
											<div class="modal-content">
												<div class="modal-header">
													<h5 class="modal-title" id="exampleModalLabel">
														Edit Category
													</h5>
													<button type="button" class="close" data-dismiss="modal" aria-label="Close">
														<i class="fa-regular fa-circle-xmark text-20"></i>
													</button>
												</div>
												<form class="input-form  y-gap-30 updateCategoryForm" method="POST">
													<div class="modal-body row">


														<div class="col-md-12 col-12">
															<div class="error-message2"></div>
														</div>

														<div class="col-md-12 col-12">
															<label class="text-16 lh-1 fw-500 text-dark-1 mb-10">Category Name <span class="text-error-1">*</span> </label>
															<input class="form-control" type="text" name="categoryname" value="<?php echo $category_name; ?>" id="category" placeholder="Enter the name of the category" required>
														</div>
														<input type="hidden" name="biz_id" value="<?php echo $biz_id; ?>">
														<input type="hidden" name="unique_id" value="<?php echo $unique_id; ?>">
														<input type="hidden" name="categoryID" class="categoryID" value="<?php echo $category_id; ?>">


													</div>
													<div class="row modal-footer">
														<div class="row">
															<!-- <div class="col-6">
																<a href="#" class="button -sm -icon -deep-green-1 text-white fw-500" data-dismiss="modal">
																	Close
																</a>
															</div> -->
															<div class="col-12">
																<button type="submit" id="submit" class="button w-100 -md -icon -deep-green-1 text-white fw-500" style="width:100% !important">
																	Save Category
																</button>

															</div>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>


									<?php
								}
								?>

							</tbody>
						</table>
					</div>

				</div>
			</div>
		</div>


		<?php
	}
	?>

</div>



<script src="api/category.js"></script>
<?php
include_once "admin-footer.php";
include_once "admin-tail.php";
?>