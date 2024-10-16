const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { onRequest } = require('firebase-functions/v2/https');
const { logger } = require('firebase-functions');
const admin = require('firebase-admin');

// 初始化 Firebase Admin SDK，并指定 Storage Bucket
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: 'healthhub-ef68d.appspot.com'
});

const app = express();
app.use(express.json());
app.use(cors());

// 创建SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wtaimin8@gmail.com',
    pass: 'aweatukughcyfleg',
  },
});

// 处理发送邮件的路由
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const bucket = admin.storage().bucket();
  const file = bucket.file('Elderly Health Check Data.pdf');

  try {
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    const mailOptions = {
      from: 'wtaimin8@gmail.com',
      to: to,
      subject: subject,
      text: text,
      attachments: [
        {
          filename: 'Elderly Health Check Data.pdf',
          path: url,
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('邮件发送成功: ' + info.response);
    res.status(200).send('邮件发送成功');
  } catch (error) {
    logger.error('邮件发送失败:', error.message || error);
    res.status(500).send('邮件发送失败');
  }
});

// 将 Express 应用导出为 Firebase Cloud Function
exports.api = onRequest(app);