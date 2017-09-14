## getting started

Install the axios-fork of BITS because it includes certain enhancements
utilized by the template:

    git clone -b axios-fork https://github.com/Axios-Engineering/bits.git
    cd bits
    npm install
    npm run build
    cd ..

Install Yeoman and the BITS module generator:

    npm install -g sao

Create a folder for your module:

    mkdir my-module

Run the generator:

    cd my-module
    sao Axios-Engineering/template-bits-module

Link this module into BITS:

    mkdir -p ../bits/data/base/modules/modules
    ln -s $PWD ../bits/data/base/modules/modules/my-module
    
Start BITS:

    cd ../bits
    npm run dev 
