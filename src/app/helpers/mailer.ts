import nodemailer from "nodemailer";
import User from "../userModel/user";
import bcryptjs from "bcryptjs";  



export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedVeriyToken = await bcryptjs.hash(userId.toString(), 10);
    const tokenExpiry = Date.now() + 36000;
    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(userId, {
        verifyToken: hashedVeriyToken,
        verifyTokenExpiry: tokenExpiry,
      });
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(userId, {
        forgotPasswordToken: hashedVeriyToken,
        forgotPasswordTokenExpiry: tokenExpiry,
      });
    }
    // verify email html vlue
    const verifyEmail= `<p> Click <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashedVeriyToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your emil" : "reset your password "
    }
       or copy or paste link below in your browser<br/>
       ${process.env.DOMAIN}/veriyemail?token=${hashedVeriyToken}
       </p>`
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a54030d84fb669", // 🔥❌ these should be in the .env file
        pass: "a624d57abcc4f0", // 🔥❌
      },
    });

    const options = {
      from: " <maddison53@ethereal.email>", // sender address
      to: "bar@example.com", // list of receivers
      subject:
        emailType === "VERIFY"
          ? " Please verify your email id!"
          : "Please reset your password !", // Subject line
      text: "Hello world?", // plain text body
      html: emailType === "VERIFY" ? verifyEmail : `<p> Click <a href="${
      process.env.DOMAIN
    }/forgotpass?password=${hashedVeriyToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your emil" : "reset your password "
    }
       or copy or paste link below in your browser<br/>
       ${process.env.DOMAIN}/forgotpass?token=${hashedVeriyToken}
       </p>`, // html body
    };

    const mailRsponse = await transporter.sendMail(options);
    return mailRsponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
