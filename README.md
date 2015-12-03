# hightlightSearch
对搜索的关键字在页面上进行高亮

####example

```javascript
    $(".searchChildren").wordLight('keyword',{
        'backgroundColor': 'red',
        'fontWeight': 'normal',
        'color': '#fff',
        'showCount': true,
        'countDOM': '#countDOM',
        'mark': 'hightLightMark'
});
```

**由于没有进行正则验证，该版本有bug（比如，会替换标签内title中的文字），暂只能实现基本功能。会再后期进行完善。