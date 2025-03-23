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

        <div class="row justify-content-center d-nne">
            <div class="col-lg-8 col-xxl-10">
                <div class="row gy-5">
                    <div class="col-lg-12 col-md-12 " data-aos="fade-up" data-aos-delay="150">
                        <div class="card border-2 rounded-3">
                            <div class="card-body d-flex flex-column ">
                                <h4 class="text-capitalize">
                                    Rules for Abstract Submission
                                </h4>
                                <p class="line-clamp-">
                                    The submitting author/presenting author should confirm that all co-authors agree to the content of the abstract and support the data presented.
                                    <br>
                                    All abstracts selected must be presented in person, either virtually or physically.
                                </p>
                                <p>
                                    Abstracts should follow the format in the attached file.
                                </p>
                                <div class="col-12">
                                    <div class="row justify-content-start">
                                        <div class="col-auto">

                                        <a class="btn btn-primary" href="format/2nd International Bioeconomy Conference 2025.pdf" download>Download Abstract Format</a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-4">
            <div class="col-lg-10" data-aos="fade-up">
                <div class="card rounded-3">
                    <div class="card-body">
                        <!-- <form data-action="form/message-form.php" method="post" class="form-submit-init"> -->
                        <form action="inc/abstracts.php" method="POST" enctype="multipart/form-data" id="abstracts-dropzone">
                            <div class="row g-gs">
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <label class="form-label">First Name</label>
                                        <div class="form-control-wrap">
                                            <input type="text" name="fname" class="form-control" placeholder="Enter your first name" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-group">
                                        <label class="form-label">Last Name</label>
                                        <div class="form-control-wrap">
                                            <input type="text" name="lname" class="form-control" placeholder="Enter your last name" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label">Email</label>
                                        <div class="form-control-wrap">
                                            <input type="email" name="email" class="form-control" placeholder="Enter your email" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label">Phone</label>
                                        <div class="form-control-wrap">
                                            <input type="text" name="phone" class="form-control" placeholder="(223) 456 - 789" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label" for="options">Presentation Preference:</label>
                                        <div class="form-control-wrap">
                                            <select id="options" name="mode" class="form-control" required>
                                                <option value="">Please select one</option>
                                                <option value="2">Oral</option>
                                                <option value="1">Poster</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- File Upload Section -->
                                <div class="col-lg-12">
                                    <div id="dropzoneArea" class="dropzone"></div>
                                    <p>You will upload the Abstract on the next page</p>
                                </div>

                                <div class="col-12">
                                    <div class="row justify-content-end">
                                        <div class="col-auto">
                                            <!-- <p>Step 1 of 2</p> -->
                                            <button class="btn btn-primary" type="submit" id="submitBtn">Upload Form</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

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