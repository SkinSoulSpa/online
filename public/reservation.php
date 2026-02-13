<?php
// Prevent direct access
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid Input"]);
    exit;
}

// Extract fields
$name = filter_var($input['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = filter_var($input['phone'] ?? '', FILTER_SANITIZE_STRING);
$date = filter_var($input['date'] ?? '', FILTER_SANITIZE_STRING);
$time = filter_var($input['time'] ?? '', FILTER_SANITIZE_STRING);
$treatment = filter_var($input['treatment'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($input['message'] ?? '', FILTER_SANITIZE_STRING);

// Validation
if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

// Email Configuration
$to = "customercare@skinsoulspa.sg, care@rabbit.com.sg"; 
$subject = "New Reservation Request: $name";

// Determine "From" address based on server domain to prevent spam flagging
$server_domain = $_SERVER['SERVER_NAME'];
// Strip www. prefix if present for cleaner email address
$server_domain = preg_replace('/^www\./', '', $server_domain);
$from_email = "noreply@" . $server_domain;

$headers = "From: Skin Soul Spa Website <$from_email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Email Body
$email_body = "
<html>
<head>
  <style>
    body { 
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
        line-height: 1.6; 
        color: #5C615E; 
        background-color: #F8F6F4; 
        margin: 0; 
        padding: 40px 20px; 
    }
    .container { 
        max-width: 600px; 
        margin: 0 auto; 
        background-color: #FFFFFF; 
        padding: 40px; 
        border: 1px solid #EBE5E0; 
        border-radius: 0; 
    }
    .header {
        text-align: center;
        margin-bottom: 40px;
        border-bottom: 1px solid #EBE5E0;
        padding-bottom: 20px;
    }
    h1 {
        font-family: 'Georgia', serif;
        font-size: 24px;
        font-weight: normal;
        color: #2C332E;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin: 0;
    }
    .subtitle {
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 12px;
        letter-spacing: 0.2em;
        color: #9CAFA0;
        text-transform: uppercase;
        margin-top: 10px;
        display: block;
    }
    .content-row {
        margin-bottom: 20px;
        border-bottom: 1px solid #F8F6F4;
        padding-bottom: 15px;
    }
    .content-row:last-child {
        border-bottom: none;
    }
    .label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: #9CAFA0;
        display: block;
        margin-bottom: 5px;
    }
    .value {
        font-size: 16px;
        color: #2C332E;
        font-family: 'Georgia', serif;
    }
    .message-box {
        background-color: #F8F6F4;
        padding: 20px;
        margin-top: 20px;
        font-style: italic;
        color: #5C615E;
    }
    .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 11px;
        color: #9CAFA0;
        border-top: 1px solid #EBE5E0;
        padding-top: 20px;
        letter-spacing: 0.1em;
    }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1>Skin Soul Spa</h1>
      <span class='subtitle'>New Reservation Request</span>
    </div>

    <div class='content-row'>
        <span class='label'>Guest Name</span>
        <div class='value'>$name</div>
    </div>

    <div class='content-row'>
        <span class='label'>Contact Details</span>
        <div class='value'>$email</div>
        <div class='value' style='margin-top: 5px;'>$phone</div>
    </div>

    <div class='content-row'>
        <span class='label'>Preferred Journey</span>
        <div class='value'>$treatment</div>
    </div>

    <div class='content-row'>
        <span class='label'>Preferred Time</span>
        <div class='value'>$date at $time</div>
    </div>

    " . (!empty($message) ? "
    <div class='content-row'>
        <span class='label'>Personal Note</span>
        <div class='message-box'>" . nl2br($message) . "</div>
    </div>
    " : "") . "

    <div class='footer'>
      SENT FROM $server_domain
    </div>
  </div>
</body>
</html>
";

// Send Email
// Use -f parameter to set the envelope sender, which improves deliverability and prevents spam flagging
if (mail($to, $subject, $email_body, $headers, "-f" . $from_email)) {
    echo json_encode(["status" => "success", "message" => "Reservation sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to send email. Please try again later."]);
}
?>