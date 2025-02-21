#!/bin/bash
# deploy.sh

# 1. Build locally
echo "Building application..."
npm run build

# 2. Install production dependencies only
echo "Installing production dependencies..."
npm install --production --no-optional

# 3. Copy to EC2 (using scp)
echo "Copying to EC2..."
scp -i "~/.ssh/rb-server-pkey.pem" -r \
    .next \
    node_modules \
    package.json \
    package-lock.json \
    public \
    ec2-user@ec2-13-42-32-246.eu-west-2.compute.amazonaws.com:/home/ec2-user/rb-portfolio

# 4. SSH into EC2 and restart the service
echo "Restarting service on EC2..."
ssh -i "~/.ssh/rb-server-pkey.pem" ec2-user@ec2-13-42-32-246.eu-west-2.compute.amazonaws.com << 'EOF'
    cd /home/ec2-user/rb-portfolio
    npm run start
EOF

echo "Deployment complete!"
