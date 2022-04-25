const isProd = process.env.NODE_ENV === 'production';
const prodPlugin = [];
if(isProd){
    prodPlugin.push([
        'transform-remove-console',
        {
            // 保留 console.error 与 console.warn
            exclude: ['error', 'warn']
        }
    ])
}
module.exports = {
    plugins: [
        ...prodPlugin
    ],
    presets: [
        '@vue/cli-plugin-babel/preset'
    ]
};

