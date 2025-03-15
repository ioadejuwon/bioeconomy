<link rel="stylesheet" href="assets/dropzone/dropzone.min.css">
<script src="assets/dropzone/dropzone.min.js"></script>
<style>
    .dropzone {
        border: 1px dashed #21565e;
        border-radius: 8px;
        /* padding: 20px; */
        text-align: center;
        
    }
</style>
<?php
$pagetitle = 'Abstract';
include_once 'comp/head.php';
include_once 'comp/header.php';
?>
<section class="nk-banner nk-banner-bs-driven is-theme is-theme-bg  pt-7 pt-lg-80 pb-lg-80 " style="background-image: url('assets/images/conf.jpg');">

    <div class="nk-banner-wrap">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="nk-section-head text-center">
                        <h1 class="display-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="0" style="font-size: 50px !important;">
                            Abstract Submission
                        </h1>
                        <p class="fs-20 px-lg-7 aos-init aos-animate" data-aos="fade-up" data-aos-delay="50">
                            Please submit your Conference Abstract using the form below
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>



<!-- <section class="nk-section pt-7 pt-lg-120"> -->
<section class="nk-banner nk-banner-live-chat-app bg-primary-100  pt-7 pb-7 pt-lg-120 pb-lg-160">
    <div class="container">
        <div class="row justify-content-center text-center d-none">
            <div class="col-lg-10 col-xxl-10">
                <div class="nk-section-head">
                    <span class="nk-section-subtitle">
                        Abstract
                    </span>
                    <h2 class="nk-section-title">
                        Abstract Submission
                    </h2>
                    <p class="nk-section-text">
                        Please submit your Conference Abstract using the form below
                    </p>
                </div>
            </div>
        </div>

        <div class="row justify-content-center d-none">
            <div class="col-lg-8 col-xxl-10">
                <div class="row gy-5">
                    <div class="col-lg-6 col-md-6 " data-aos="fade-up" data-aos-delay="150">
                        <div class="card border-2 rounded-3">
                            <div class="card-body d-flex flex-column ">
                                <h4 class="text-capitalize">
                                    Conference Fees
                                </h4>
                                <p class="line-clamp-">
                                    <strong>Faculty Members:</strong> ₦20,000.00
                                    <br>
                                    <strong> Non-Faculty Members:</strong> ₦25,000.00
                                    <br>
                                    <strong>Student:</strong> ₦5,000.00 (with evidence of being a student)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 " data-aos="fade-up" data-aos-delay="150">
                        <div class="card border-2 rounded-3">
                            <div class="card-body d-flex flex-column ">
                                <h4 class="text-capitalize">
                                    Naira (₦) Account Details
                                </h4>
                                <p class="line-clamp-">
                                    <strong>Account No:</strong> 01234567
                                    <br>
                                    <strong>Account Name:</strong> Bioeconomy Conference
                                    <br>
                                    <strong>Bank Name:</strong> Access Bank
                                </p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-">
            <div class="col-lg-10" data-aos="fade-up">
                <div class="card rounded-3">
                    <div class="card-body">
                        <form action="../api/edit_images.php" class="dropzone" id="edit-images-dropzone">
                            <input type="hidden" name="productid" id="product_id" value="<?php echo $_GET['productid']; ?>">
                        </form>
                        <!-- <button type="button" id="upload-button">Upload Images</button> -->

                        <div class="row justify-content-end">
                            <div class="col-auto">
                                <button class="btn btn-primary" type="submit" id="upload-button">Submit Abstract</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<?php
include_once 'comp/footer.php';
include_once 'comp/tail.php';
?>