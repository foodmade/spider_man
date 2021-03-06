var _VER = '1.0.0';
var _INDEX = 0;
var _TYPE = '7cl:search_home_list';

var _RETCODE_SUCCESS = 1;
var _RETCODE_ERROR = -1;

function log(log, level){
    utils.log('{DParser 7cl:search_home_list ' + _INDEX + '(ver:' + _VER + ')} ' + log, level);
}

function parserHtml() {
    var result = {
        rows :[],
        retcode:_RETCODE_ERROR
    };
    var $ = cheerio.load(htmlString);
    var videoList = $('div.list-video div.video-play');
    log('videoList length:'+videoList.length,4);
    if(videoList.length === 0){
        return result;
    }
    for (var i = 0;i<videoList.length;i++){
        /**封面图*/
        var coverImg = $(videoList[i]).find('img').attr('src');
        /**是否高清**/
        var videoType = '';
        /**电影名称**/
        var videoName = $(videoList[i]).find('p.title-p').text();
        /**评分**/
        var score = $(videoList[i]).find('span.fr').text();
        /**人物信息**/
        var figures = {
            actor:[],
            director:[]
        };
        /**视频 id**/
        var videoId =$(videoList[i]).find('div.play-bottom a').attr('href');
        log('coverImg:'+coverImg,4);
        log('videoType:'+videoType,4);
        log('videoName:'+videoName,4);
        log('figures:'+JSON.stringify(figures),4);
        log('videoId:'+videoId,4);
        log('score:'+score.trim(),4);
        result.rows.push({
            coverimg:coverImg,
            videotype:videoType,
            videoname:videoName,
            figures:figures,
            videoid:videoId,
            score:score.trim().replace('观看','')
        })
    }
    result.retcode = _RETCODE_SUCCESS;
    return result;

}


try{

    log("htmlString:"+htmlString,4);
    result = parserHtml();

    parserInfo.index = _INDEX;
    parserInfo.ver = _VER;
    parserInfo.type = _TYPE;

    result.handler = _INDEX;

    if(result.items.length > 0){
        result.retcode = _RETCODE_SUCCESS;
    }else{
        result.retcode = _RETCODE_ERROR;
    }

    log('Parsing res check,Total hits:' + result.totalHits + ', items count:' + result.items.length,
        config.LOG._LOG_LEVEL_WARNING);

}catch(exp){
    log('Parsing exception:' + exp.message, config.LOG._LOG_LEVEL_ERROR);
}