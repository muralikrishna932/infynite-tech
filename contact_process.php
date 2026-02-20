<?php
/**
 * contact_process.php
 * Handles Contact Form submission with math CAPTCHA validation.
 */

session_start();

// ─── Configuration ────────────────────────────────────────────────────────────
$to         = 'contact@infynitetech.com';   
$from_name  = 'Contact Form';
$from_email = 'contact@infynitetech.com'; 
$subject_prefix = '[Contact Form] ';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function sanitize(string $value): string {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

function redirect(string $status, string $message): void {
    $encoded = urlencode($message);
    header("Location: contact.html?status={$status}&msg={$encoded}");
    exit;
}

// ─── Only handle POST ──────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('error', 'Invalid request method.');
}

// ─── CAPTCHA Validation ────────────────────────────────────────────────────────
$captcha_answer   = isset($_POST['captcha_answer'])   ? (int) $_POST['captcha_answer']   : null;
$captcha_expected = isset($_POST['captcha_expected']) ? (int) $_POST['captcha_expected'] : null;

if ($captcha_answer === null || $captcha_expected === null || $captcha_answer !== $captcha_expected) {
    redirect('error', 'CAPTCHA verification failed. Please go back and try again.');
}

// ─── Required Fields ──────────────────────────────────────────────────────────
$required = ['first_name', 'last_name', 'email', 'subject', 'message'];
foreach ($required as $field) {
    if (empty(trim($_POST[$field] ?? ''))) {
        redirect('error', "Missing required field: {$field}.");
    }
}

// ─── Sanitize Input ───────────────────────────────────────────────────────────
$first_name = sanitize($_POST['first_name']);
$last_name  = sanitize($_POST['last_name']);
$email      = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$phone      = sanitize($_POST['phone'] ?? '');
$subject    = sanitize($_POST['subject']);
$message    = sanitize($_POST['message']);

// ─── Email Validation ─────────────────────────────────────────────────────────
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect('error', 'Please provide a valid email address.');
}

// ─── Header Injection Guard ───────────────────────────────────────────────────
foreach ([$first_name, $last_name, $email, $subject] as $val) {
    if (preg_match('/[\r\n]/', $val)) {
        redirect('error', 'Invalid input detected.');
    }
}

// ─── Build Email ──────────────────────────────────────────────────────────────
$full_name = "{$first_name} {$last_name}";
$email_subject = $subject_prefix . $subject;

$body = <<<EOT
You have received a new message via the Contact Form.

───────────────────────────────────
  Name    : {$full_name}
  Email   : {$email}
  Phone   : {$phone}
  Subject : {$subject}
───────────────────────────────────

Message:
{$message}

───────────────────────────────────
Sent: {$_SERVER['REQUEST_TIME']}
IP  : {$_SERVER['REMOTE_ADDR']}
EOT;

$headers  = "From: {$from_name} <{$from_email}>\r\n";
$headers .= "Reply-To: {$full_name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ─── Send Email ───────────────────────────────────────────────────────────────
$sent = mail($to, $email_subject, $body, $headers);

if ($sent) {
    redirect('success', 'Thank you! Your message has been sent. We\'ll be in touch soon.');
} else {
    // Log the error server-side
    error_log("[ContactForm] Failed to send email from {$email} at " . date('Y-m-d H:i:s'));
    redirect('error', 'Sorry, there was a problem sending your message. Please try again later.');
}
