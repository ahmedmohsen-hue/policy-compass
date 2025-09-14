# GitHub Pages Deployment Guide for Policy Compass

## 🚀 Quick Start Deployment

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click **"New repository"** (green button)
3. Repository name: `policy-compass-landing`
4. Make it **Public** (required for free GitHub Pages)
5. Check **"Add a README file"**
6. Click **"Create repository"**

### Step 2: Upload Your Files
You have several options to upload the files:

#### Option A: Web Interface (Easiest)
1. In your new repository, click **"uploading an existing file"**
2. Drag and drop these files:
   - `index.html`
   - `css/premium-style.css`
   - `js/premium-script.js`
   - `README.md`
3. Write commit message: "Add Policy Compass landing page"
4. Click **"Commit changes"**

#### Option B: Git Commands (If you have Git installed)
```bash
git clone https://github.com/yourusername/policy-compass-landing.git
cd policy-compass-landing
# Copy your files into this directory
git add .
git commit -m "Add Policy Compass landing page"
git push origin main
```

### Step 3: Enable GitHub Pages
1. In your repository, go to **Settings** tab
2. Scroll down to **Pages** section (left sidebar)
3. Under **Source**, select **"Deploy from a branch"**
4. Choose **Branch**: `main`
5. Choose **Folder**: `/ (root)`
6. Click **Save**

### Step 4: Access Your Live Site
- Your site will be available at: `https://yourusername.github.io/policy-compass-landing/`
- GitHub will show you the exact URL in the Pages settings
- It may take 5-10 minutes for the first deployment

## 🌍 Custom Domain Setup (Optional)

### If You Have a Domain (like policycompass.org):
1. In your repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain: `www.policycompass.org`
3. Check **"Enforce HTTPS"** 
4. Create a `CNAME` file in your repository root containing: `www.policycompass.org`
5. In your domain provider (GoDaddy, Namecheap, etc.):
   - Add CNAME record: `www` → `yourusername.github.io`
   - Add A records for root domain pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

## 📁 Required File Structure

Ensure your repository has this structure:
```
policy-compass-landing/
├── index.html                    # Main page (required)
├── css/
│   └── premium-style.css        # Styles
├── js/
│   └── premium-script.js        # JavaScript
├── README.md                    # Documentation
├── DEPLOYMENT.md                # This guide
└── CNAME                        # Only if using custom domain
```

## 🔧 Updating Your Site

### To Make Changes:
1. Edit files in your repository (click the pencil icon)
2. Or upload new versions of files
3. Commit changes with a descriptive message
4. Changes will automatically deploy in 1-2 minutes

### Quick Edits:
- **Text changes**: Edit `index.html` directly on GitHub
- **Styling changes**: Edit `css/premium-style.css`
- **Functionality changes**: Edit `js/premium-script.js`

## 🎯 Post-Deployment Checklist

### ✅ Verify Everything Works:
- [ ] Site loads at your GitHub Pages URL
- [ ] All images display correctly
- [ ] Registration links work (Google Forms)
- [ ] Mobile responsive design functions
- [ ] Animations and interactions work
- [ ] Timeline navigation functions
- [ ] Language toggle works
- [ ] All buttons and links are functional

### ✅ SEO Setup:
- [ ] Update meta description in `index.html`
- [ ] Add Google Analytics code (when ready)
- [ ] Submit to Google Search Console
- [ ] Test site speed with PageSpeed Insights

### ✅ Social Media Ready:
- [ ] Share the live URL on social media
- [ ] Test Open Graph meta tags
- [ ] Ensure mobile sharing works correctly

## 📈 Analytics Integration (Next Steps)

### Google Analytics 4 Setup:
1. Create Google Analytics account
2. Get tracking code (G-XXXXXXXXXX)
3. Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Facebook Pixel (If Using Facebook Ads):
```html
<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

## 🔧 Troubleshooting

### Common Issues:

**Site not loading:**
- Check repository is public
- Verify Pages is enabled in Settings
- Wait 10-15 minutes for first deployment

**Images not showing:**
- Ensure all image URLs are correct
- Check file paths match exactly (`css/` not `CSS/`)

**Styles not applying:**
- Verify CSS file path in HTML
- Check for syntax errors in CSS
- Clear browser cache (Ctrl+F5)

**JavaScript not working:**
- Check browser console for errors (F12)
- Verify JS file path in HTML
- Ensure all external libraries load

### Performance Issues:
- Use browser dev tools to check load times
- Optimize images if needed
- Consider minifying CSS/JS for production

## 🎉 You're Live!

Once deployed, your premium Policy Compass landing page will be:

✅ **Professionally hosted** on GitHub's reliable infrastructure  
✅ **HTTPS enabled** for security and SEO  
✅ **Mobile optimized** for global accessibility  
✅ **Fast loading** with CDN distribution  
✅ **Easy to update** through GitHub interface  

### Share Your Success:
- **Live URL**: `https://yourusername.github.io/policy-compass-landing/`
- **Professional presentation** ready for €490 premium pricing
- **Global audience ready** with Arabic/English support
- **Conversion optimized** for serious policy professionals

**Your premium Policy Compass landing page is now live and ready to attract high-value participants! 🎯**