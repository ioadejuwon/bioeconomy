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
                        <form data-action="form/message-form.php" method="post" class="form-submit-init">
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
                                            <input type="email" name="user-email" class="form-control" placeholder="Enter your email" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label">Phone</label>
                                        <div class="form-control-wrap">
                                            <input type="text" name="user-phone" class="form-control" placeholder="(223) 456 - 789" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label" for="options">Select Registration Fee:</label>
                                        <div class="form-control-wrap">
                                            <select id="options" name="options" class="form-control" required>
                                                <option value="">Please select one</option>
                                                <option value="Faculty Member">Faculty Members ₦20,000.00</option>
                                                <option value="Non-Faculty Member">Non-Faculty Members: ₦25,000.00</option>
                                                <option value="Student">Student ₦5,000.00 (with evidence of being a student)</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label" for="options">Presentation Preference:</label>
                                        <div class="form-control-wrap">
                                            <select id="options" name="options" class="form-control" required>
                                                <option value="">Please select one</option>
                                                <option value="Faculty Member">Oral</option>
                                                <option value="Non-Faculty Member">Poster</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="form-label">Abstract</label>
                                        <div class="form-control-wrap">
                                            <input type="file" name="user-email" class="form-control" required>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-group">
                                        <button class="btn btn-primary" type="submit" id="submit-btn">Submit Abstract</button>
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