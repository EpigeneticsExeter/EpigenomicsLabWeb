# EpigeonmicsLab Website
This is the repository for the epigenomicslab.com (eventually).

Currently the pages are being deployed to:
https://sof202.github.io/EpigenomicsLabWeb/

In the future (once I have gained access) I will transfer this repository
over to [EpigeneticsExeter](https://github.com/EpigeneticsExeter). I'll then
make it a private repository (hopefully the deployment still works)

## Running locally

In order to run this locally you will need to do the following:

1. Install Hugo and git (a farily recent version of git is required >=2.31)
2. Clone this repository
3. navigate the the root of this repository and run `hugo server`

## Running over an ssh connection (ISCA)

You'll need to jump through a few extra hoops in order to run the site 
through an ssh connection. As such, here is a step by step guide on how to
run the site:

Step 1: Install Hugo

Run the following in a compute node:

```bash
mkdir -p ~/.local/bin/
wget https://github.com/gohugoio/hugo/releases/download/v0.126.0/hugo_extended_0.126.0_Linux-64bit.tar.gz
tar -C ~/.local/bin -xzf hugo_extended_0.126.0_Linux-64bit.tar.gz
rm hugo_extended_0.126.0_Linux-64bit.tar.gz
rm README.md
rm LISENCE
```

Step 2: Clone this repository

```bash
git clone https://github.com/sof202/EpigenomicsLabWeb.git path/to/wherever/you/want/to/put/it
```

Step 3: Create an SSH tunnel

Go to your terminal, not the ssh connection, just your local terminal. If you
are a windows user, just press `crtl + r` then type "cmd" and hit enter.

Now we will create an SSH tunnel with:

```bash
ssh -L port:localhost:port username@hostname
```

Where:

- port should be a number from 49152 and 65535. You can't pick a number someone
else is already using. You will get an error if this is the case (so just pick
a different port number, you just got unlucky). 
- username is the username you use to log onto the remote server
- hostname is the bit that follows after @ when you usually login to the remote
server

Step 4: Run the server

Navigate to the path you cloned the repository to in step 2. Remember that you
need a recent version of git for hugo to function. I'm not sure on a miniumum
version number, but if `git version` gives <2.0, it certainly will not work.
If your git version is old, use `module load git` or something to that effect.

Now once you have those prerequisites in order. From the root of this 
repository, type the following into the terminal:

```bash
hugo server -p port
```

Where port is the port number you made the ssh tunnel with earlier.

Step 5:

View the website by clicking the link that appears in your terminal or heading
to the address:
http://localhost:port/EpigenomicsLabWeb/

Again, port is the port number you used to create the ssh connection in step 3.
