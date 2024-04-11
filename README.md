# IoT_Course_SRB_Illinoise
git clone https://github.com/StoyanBoyukliyski/IoT_Course_SRB_Illinoise.git

# Course_1_IoT_Devices
This has been detailed in the subsequent folder: Course_1_IoT_Devices/Picar-functioning/...

# Course_2_IoT_Communications

# From the PC - Before doing anything find the IP of the Raspberry Pi and change it in the JavaScript code

# Install npm - I have been working with Linux on a MAC M1 Chip therefore the distro from ARM64, Linux
https://nodejs.org/en/download/prebuilt-binaries
tar -xvf node-v21.7.2-linux-arm64.tar.xz
sudo mv node-v16.0.0-linux-x64 /usr/local/node
# To add npm to the command set
export PATH=/usr/local/node/bin:$PATH

# Then install electron from the directory
npm install electron

# Then start with the following command
npm start

# From the device find the IP of the IoT device and change the code in wifi_server.py

# After this start the wifi server
python3 wifi_server.py

