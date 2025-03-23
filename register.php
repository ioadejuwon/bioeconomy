<?php
$pagetitle = 'Register';
include_once 'comp/head.php';
include_once 'comp/header.php';


if (isset($_GET['email'])) {
    $email = htmlspecialchars($_GET['email']); // Sanitize input to prevent XSS
    
} else {
    $email = '';
}
?>




<section class="nk-banner nk-banner-bs-driven is-theme is-theme-bg  pt-7 pt-lg-80 pb-lg-80 " style="background-image: url('assets/images/conf.jpg');">

    <div class="nk-banner-wrap">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="nk-section-head text-center">
                        <h1 class="display-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="0" style="font-size: 50px !important;">
                            2025 Conference Registration
                        </h1>
                        <p class="fs-20 px-lg-7 aos-init aos-animate" data-aos="fade-up" data-aos-delay="50">
                            All participants are required to register using the form below.
                            <br>
                            Registered participants will receive eCertificate of Attendance (for attending only) and eCertificate of Presentation (for Presenters/Authors).
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<section class="nk-banner nk-banner-live-chat-app bg-primary-100  pt-7 pb-7 pt-lg- pb-lg-160">
    <div class="container">
        <div class="row justify-content-center text-center d-none">
            <div class="col-lg-10 col-xxl-10">
                <div class="nk-section-head">
                    <span class="nk-section-subtitle">
                        Contact US
                    </span>
                    <h2 class="nk-section-title">
                        2025 Conference Registration
                    </h2>
                    <p class="nk-section-text">
                        All participants are required to register using the form below.
                        <br>
                        Registered participants will receive eCertificate of Attendance (for attending only) and eCertificate of Presentation (for Presenters/Authors).
                    </p>
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-10 col-xxl-10">
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

        <div class="row justify-content-center mt-4">
            <div class="col-lg-10" data-aos="fade-up">
                <div class="card rounded-3">
                    <div class="card-body">
                        <form id="registerForm" method="POST"  enctype="multipart/form-data">
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
                                            <input type="email" name="email" class="form-control" placeholder="Enter your email" value="<?php echo $email ?>" required>
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
                                        <label class="form-label" for="options">Select Registration Fee:</label>
                                        <div class="form-control-wrap">
                                            <select id="options" name="fee" class="form-control" required>
                                                <option value="">Please select one</option>
                                                <option value="1">Faculty Members ₦20,000.00</option>
                                                <option value="2">Non-Faculty Members: ₦25,000.00</option>
                                                <option value="0">Student ₦5,000.00 (with evidence of being a student)</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-6 col-12">
                                    <div class="form-group">
                                        <label class="form-label">Evidence of Payment </label>
                                        <div class="form-control-wrap">
                                            <input type="file" name="paymentproof" class="form-control" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label" for="options">Are you a student?</label>
                                        <div class="form-control-wrap">
                                            <select id="options" name="student" class="form-control" required>
                                                <option value="">Please select one</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label">If you are a student, please provide evidence</label>
                                        <div class="form-control-wrap">
                                            <input type="file" name="studentproof" class="form-control" >
                                        </div>
                                    </div>
                                </div>
                              
                                <div class="col-12">
                                    <div class="form-group">
                                        <div class="form-label-group">
                                            <label class="form-label">Address Instituition or Affiliation</label>
                                            <span>
                                                <span id="char-count">0</span>/<span id="char-max" data-char-max="255">255</span>
                                            </span>
                                        </div>
                                        <div class="form-control-wrap">
                                            <textarea id="textarea-bx" name="address" class="form-control" placeholder="Enter your message" required></textarea>
                                            <!-- <textarea id="textarea-box" name="message" class="form-control" placeholder="Enter your message" required></textarea> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row justify-content-end">
                                        <div class="col-auto">
                                            <button class="btn btn-primary" type="submit" name="register" >Register</button>
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

<script src="api/register.js"></script>
<?php
include_once 'comp/footer.php';
include_once 'comp/tail.php';
?>