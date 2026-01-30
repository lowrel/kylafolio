import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, company, email, projectType, projectDetails } = await request.json()
    
    if (!name || !email || !projectType || !projectDetails) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'kylalacson0430@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD // You'll need to set this
      }
    })

    const mailOptions = {
      from: 'kylalacson0430@gmail.com',
      to: 'kylalacson0430@gmail.com',
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Project Details:</strong></p>
        <p>${projectDetails.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from your portfolio website</em></p>
      `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! Your request has been sent successfully.' 
    })

  } catch (error) {
    console.error('Email Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send email. Please contact directly at kylalacson0430@gmail.com' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}