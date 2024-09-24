mkdir -p dist
cp -r public dist
cp -a .next/standalone/. dist/
cp -r .next/static dist/.next/
cp -r pm2.config.js dist/
