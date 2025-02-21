#!/bin/bash
# deploy.sh

# 1. Build locally
echo "Building application..."
npm run build

# 2. Use rsync to copy only changed files, excluding node_modules
echo "Copying to EC2..."
rsync -avz --progress \
    --exclude 'node_modules' \
    -e "ssh -i ~/.ssh/rb-server-pkey.pem" \
    .next \
    package.json \
    package-lock.json \
    public \
    ec2-user@ec2-13-42-32-246.eu-west-2.compute.amazonaws.com:/home/ec2-user/rb-portfolio

# 3. SSH into EC2 and install dependencies + restart
echo "Installing dependencies and restarting on EC2..."
ssh -i "~/.ssh/rb-server-pkey.pem" ec2-user@ec2-13-42-32-246.eu-west-2.compute.amazonaws.com << 'EOF'
    cd /home/ec2-user/rb-portfolio
    npm install --omit=dev --omit=optional
    pm2 restart rb-portfolio
EOF

echo "Deployment complete!"