export function getPasswordResetTemplate(userName: string, code: string): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0052cc;">Hello ${userName},</h2>
      <p>You requested to reset your password. Use the code below to proceed:</p>
      <p style="font-size: 1.5em; font-weight: bold; background: #f0f0f0; padding: 10px; border-radius: 5px; display: inline-block;">
        ${code}
      </p>
      <p>This code will expire in <strong>5 minutes</strong>.</p>
      <p style="color: #cc0000; font-weight: bold;">
        Please do not share this code with anyone to keep your account secure.
      </p>
      <p>If you did not request this, please ignore this email.</p>
      <br />
      <p>Best regards,<br/>To You</p>
    </div>
  `;
}
