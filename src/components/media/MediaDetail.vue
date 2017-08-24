<template>
  <div class="mediaDetail">
    <template v-if="platType == 1">
      <section class="mediaDetail_wx mediaDetail_wxV3">
        <div class="top">
          <header>
            <div class="detailHead detailHeadNew detailHeadV3">
              <div class="avatar">
                <img v-bind:src="mbInfo.mediaImage" alt="">
                <i class="id_mark mark_wx" v-if="mbInfo.isAuth==1"></i>
              </div>
              <div class="info">
                <div class="md-name">
                  <h4 class="wx">{{mbInfo.mediaName}}</h4>
                </div>
                <div class="wxID sub_detail">微信号: {{mbInfo.mediaId}}</div>
                <div class="md-labels">
                  <span v-for="item in mbInfo.tagList || []">{{item}}</span>
                </div>
                <div class="wx_fans">
                  {{mbInfo.fansNum}}粉丝
                </div>
              </div>
              <div class="Introduction">
                <div class="brief els" v-if="briefShowState">
                  {{mbInfo.brief.length != 0 ? mbInfo.brief : '暂无简介'}}
                </div>
                <div class="brief briefShow" v-else>
                  <div>{{mbInfo.brief.length != 0 ? mbInfo.brief : '暂无简介'}}</div>
                  <div class="wx_authinfo"> 账号主体: {{mbInfo.authInfo}}</div>
                </div>
                <div class="drawer fl" v-on:click="briefShowState = !briefShowState">
                              <span v-if="briefShowState">
                                  展开<i class="arrow-down"></i>
                              </span>
                              <span v-else>
                                  收起<i class="arrow-up"></i>
                              </span>
                </div>
              </div>
              <div class="detail_sum box_flex">
                <div class="box_flex_1"><em>{{numFixed(mbInfo.dealNum)}}</em>累计成交</div>
                <div class="box_flex_1"><em>{{numFixed(mbInfo.collectedUserCount)}}</em>收藏</div>
              </div>
            </div>
          </header>
        </div>
        <div class="media_main">
          <div class="mediaMenu box_flex">
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 0}" v-on:click="currMenu = 0">卖家介绍</div>
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 1}" v-on:click="currMenu = 1">媒体数据</div>
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 2}" v-on:click="currMenu = 2">近期发布</div>
          </div>
          <div class="platCont">
            <div class="sellInfo" v-show="currMenu == 0">
              <ul class="list_cntr sell_list">
                <li v-for="item in sellList" v-on:click="handleClickSellList">
                  <div class="img_head_cntr">
                    <img class="head_icon" alt="" v-bind:src="item.userInfo.userImage">
                  </div>
                  <div class="list_detail">
                    <div class="sell-desc els"
                         v-bind:class="{authed:item.userInfo.authType.indexOf('3') != -1}">
                      {{item.userInfo.userName}}
                    </div>
                    <div class="sell_judge">卖家好评率{{Math.round(item.userInfo.goodCmt * 100)}}%</div>
                  </div>
                  <div class="price cf">
                    <div v-for="item,index in item.productInfo.goods" class="fl" :key="item.goodsId"
                         v-bind:class="{'fr': (index + 1) % 2 == 0,'fl':(index+1)%2 != 0 }">
                      <span class="txt">{{item.goodsDesc}}</span>
                      <span class="sell-price">{{(item.price == -1 || !item.price) ? '--' : '¥'+(item.price / 100).toFixed(2)}}</span>
                    </div>
                  </div>
                  <span class="buy_btn">购买</span>
                </li>
                <li id="sell_more" class="load_more" style="display: none"></li>
                <li class="no_data" v-if="sellList.length == 0 && sellFlag">
                  <p>已经有 {{RandomNumBoth(15,30)}} 个买家 求购此媒体</p>
                  <a href="javascript:;" v-on:click="toDownload">立即认领</a>
                </li>
              </ul>
            </div>
            <div class="mediaData" v-show="currMenu == 1">
              <div class="tab_cntr">
                数据维度
                <div class="open1">
                  <span>7日数据</span>
                  <span>30日数据</span>
                  <input type="checkbox" v-model="checkData">
                </div>
              </div>
              <div class="data_cntr day7" v-show="checkData">
                <div class="statis_data_cntr">
                  <div class="media_sum">
                    <ul class="statis_line_1 box_flex">
                      <li class="box_flex_1">
                        <p class="red_num">{{statistics.pubNum}}</p>

                        <p>发布次数</p>
                      </li>
                      <li class="box_flex_1">
                        <p class="red_num">{{statistics.swjrArticle}}</p>

                        <p>10万+文章</p>
                      </li>
                      <li class="box_flex_1">
                        <p class="red_num">{{statistics.hlavGread}}</p>

                        <p>头条均阅读</p>
                      </li>
                    </ul>
                    <ul class="statis_line_2 box_flex">
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.hlavgZan}}</p>

                        <p>头条均点赞</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.totalZan}}</p>

                        <p>总点赞</p>
                      </li>
                      <li class="box_flex_1 brn">

                      </li>
                    </ul>
                  </div>
                  <div class="charts">
                    <h1>
                      头条阅读数
                    </h1>
                    <div class="chart_charts" id="charts1" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                  <div class="charts">
                    <h1>二条阅读数
                    </h1>
                    <div class="chart_charts" id="charts2" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                  <div class="charts">
                    <h1>
                      三条阅读数
                    </h1>
                    <div class="chart_charts" id="charts3" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                </div>
              </div>
              <div class="data_cntr day30" v-show="!checkData">
                <div class="statis_data_cntr">
                  <div class="media_sum">
                    <ul class="statis_line_1 box_flex">
                      <li class="box_flex_1">
                        <p class="red_num">{{statistics.pubNum30}}</p>

                        <p>发布次数</p>
                      </li>
                      <li class="box_flex_1">
                        <p class="red_num">{{statistics.swjrArticle30}}</p>

                        <p>10万+文章</p>
                      </li>
                      <li class="box_flex_1">
                        <p class="red_num">{{statistics.hlavGread30}}</p>

                        <p>头条均阅读</p>
                      </li>
                    </ul>
                    <ul class="statis_line_2 box_flex">
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.hlavgZan30}}</p>

                        <p>头条均点赞</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.totalZan30}}</p>

                        <p>总点赞</p>
                      </li>
                      <li class="box_flex_1 brn">

                      </li>
                    </ul>
                  </div>
                  <div class="charts">
                    <h1>
                      头条阅读数
                    </h1>
                    <div class="chart_charts" id="lineChart1" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                  <div class="charts">
                    <h1>二条阅读数

                    </h1>
                    <div class="chart_charts" id="lineChart2" style="width:3.47rem;height: 1.8rem;"></div>
                  </div>
                  <div class="charts">
                    <h1>
                      三条阅读数
                    </h1>
                    <div class="chart_charts" id="lineChart3" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="recentArticle" v-show="currMenu == 2">
              <div class="tab_cntr">
                排序方式
                <div class="open1">
                  <span>按时间</span>
                  <span>按热度</span>
                  <input type="checkbox" v-model="checkQueue">
                </div>
              </div>
              <ul class="list_cntr article_list">
                <li v-for="item in articleList" v-on:click="goLinkArticle(item.url)">
                  <div class="img_head_cntr">
                    <div class="head_icon">
                      <Pic :src="item.coverPlan"></Pic>
                    </div>
                  </div>
                  <em class="id_mark mark_art" v-if="item.isOriginal == 1"></em>
                  <div class="list_detail">
                    <div class="list_desc">
                      <div class="art_title">{{item.title}}</div>
                    </div>
                    <div class="art_data box_flex">
                      <span class="articleTime box_flex_1">{{formatPubtime(item.pubTime)}}</span>
                      <span class="box_flex_1 yd stat_data">{{numFixed(item.readNum)}}</span>
                      <span class="box_flex_1 zan stat_data">{{numFixed(item.zanNum)}}</span>
                    </div>
                  </div>
                </li>
                <li id="article_more" class="load_more" style="display: none"></li>
                <li class="no_data" v-if="articleList.length == 0 && articleListFlag">暂无数据,请在24小时后查看</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-if="platType == 2">
      <section class="mediaDetail_wb mediaDetail_wbV3">
        <div class="top">
          <header>
            <div class="detailHead detailHeadNew detailHeadV3" v-show="detailLoaded">
              <div class="avatar">
                <img v-bind:src="mbInfo.mediaImage" alt="">
                <i class="id_mark"
                   v-bind:class="{'id_mark_y':mbInfo.isAuth == 1,'id_mark_b':mbInfo.isAuth == 2}"></i>
              </div>
              <div class="info">
                <div class="md-name">
                  <h4 class="wb">{{mbInfo.mediaName}}</h4>
                </div>
                <div class="wxID sub_detail">粉丝数: {{mbInfo.fansNum}}</div>
                <div class="md-labels">
                  <span v-for="item in mbInfo.tagList || []">{{item}}</span>
                </div>
              </div>
              <div class="Introduction">
                <div class="brief els" v-if="briefShowState">
                  {{mbInfo.brief.length != 0 ? mbInfo.brief : '暂无简介'}}
                </div>
                <div class="brief briefShow" v-else>
                  <div>{{mbInfo.brief.length != 0 ? mbInfo.brief : '暂无简介'}}</div>
                  <div class="wb_authinfo">微博认证: {{mbInfo.authInfo}}</div>
                </div>
                <div class="drawer fl" v-on:click="briefShowState = !briefShowState">
                              <span v-if="briefShowState">
                                  展开<i class="arrow-down"></i>
                              </span>
                              <span v-else>
                                  收起<i class="arrow-up"></i>
                              </span>
                </div>
              </div>
              <div class="detail_sum box_flex">
                <div class="box_flex_1"><em>{{numFixed(mbInfo.dealNum)}}</em>累计成交</div>
                <div class="box_flex_1"><em>{{numFixed(mbInfo.collectedUserCount)}}</em>收藏</div>
              </div>
            </div>
          </header>
        </div>
        <div class="media_main">
          <div class="mediaMenu box_flex">
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 0}" v-on:click="currMenu = 0">卖家介绍</div>
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 1}" v-on:click="currMenu = 1">媒体数据</div>
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 2}" v-on:click="currMenu = 2">近期发布</div>
          </div>
          <div class="platCont">
            <div class="sellInfo" v-show="currMenu == 0">
              <ul class="list_cntr sell_list">
                <li v-for="item in sellList" v-on:click="handleClickSellList">
                  <div class="img_head_cntr">
                    <img class="head_icon" alt="" v-bind:src="item.userInfo.userImage">
                  </div>
                  <div class="list_detail">
                    <div class="sell-desc els"
                         v-bind:class="{authed:item.userInfo.authType.indexOf('3') != -1}">
                      {{item.userInfo.userName}}
                    </div>
                    <div class="sell_judge">卖家好评率{{Math.round(item.userInfo.goodCmt * 100)}}%</div>
                  </div>
                  <div class="price cf">
                    <div v-for="item,index in item.productInfo.goods" class="fl" :key="item.goodsId"
                         v-bind:class="{'fr': (index + 1) % 2 == 0,'fl':(index+1)%2 != 0 }">
                      <span class="txt">{{item.goodsDesc}}</span>
                      <span class="sell-price">{{(item.price == -1 || !item.price) ? '--' : '¥'+(item.price / 100).toFixed(2)}}</span>
                    </div>
                  </div>
                  <span class="buy_btn">购买</span>
                </li>
                <li id="sell_more" class="load_more" style="display: none"></li>
                <li class="no_data" v-if="sellList.length == 0 && sellFlag">
                  <p>已经有 {{RandomNumBoth(15,30)}} 个买家 求购此媒体</p>
                  <a href="javascript:;" v-on:click="toDownload">立即认领</a>
                </li>
              </ul>
              <!--<ul class="list_cntr sell_list" v-if="sellList.length == 0 && sellFlag">

              </ul>-->
            </div>
            <div class="mediaData" v-show="currMenu == 1">
              <div class="tab_cntr">
                数据维度
                <div class="open1">
                  <span>7日数据</span>
                  <span>30日数据</span>
                  <input type="checkbox" v-model="checkData">
                </div>
              </div>
              <div class="data_cntr day7" v-show="checkData">
                <div class="statis_data_cntr">
                  <div class="media_sum">
                    <ul class="statis_line_1 box_flex">
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.originalNum}}</p>

                        <p>原创微博</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.avgSpread}}</p>

                        <p>篇均转发</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.avgComment}}</p>

                        <p>篇均评论</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.avgZan}}</p>

                        <p>篇均点赞</p>
                      </li>
                    </ul>
                  </div>
                  <div class="charts">
                    <h1>
                      日总转发
                    </h1>
                    <div class="chart_charts" id="charts1" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                  <div class="charts">
                    <h1>日总评论
                    </h1>
                    <div class="chart_charts" id="charts2" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                  <div class="charts">
                    <h1>
                      日总点赞
                    </h1>
                    <div class="chart_charts" id="charts3" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                </div>
              </div>
              <div class="data_cntr day30" v-show="!checkData">
                <div class="statis_data_cntr">
                  <div class="media_sum">
                    <ul class="statis_line_1 box_flex">
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.originalNum30}}</p>

                        <p>原创微博</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.avgSpread30}}</p>

                        <p>篇均转发</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.avgComment30}}</p>

                        <p>篇均评论</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.avgZan30}}</p>

                        <p>篇均点赞</p>
                      </li>
                    </ul>
                  </div>
                  <div class="charts">
                    <h1>
                      日总转发
                    </h1>
                    <div class="chart_charts" id="lineChart1" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                  <div class="charts">
                    <h1>日总评论

                    </h1>
                    <div class="chart_charts" id="lineChart2" style="width:3.47rem;height: 1.8rem;"></div>
                  </div>
                  <div class="charts">
                    <h1>
                      日总点赞
                    </h1>
                    <div class="chart_charts" id="lineChart3" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="recentArticle" v-show="currMenu == 2">
              <div class="tab_cntr">
                排序方式
                <div class="open1">
                  <span>按时间</span>
                  <span>按热度</span>
                  <input type="checkbox" v-model="checkQueue">
                </div>
              </div>
              <ul class="list_cntr article_list">
                <li v-for="item in articleList" v-on:click="goLinkArticle(item.url)">
                  <div class="img_head_cntr">
                    <div class="head_icon">
                      <Pic :src="item.coverPlan"></Pic>
                    </div>
                  </div>
                  <div class="list_detail">
                    <div class="list_desc">
                      <div class="art_title">{{item.title}}</div>
                      <div class="articleTime">{{formatPubtime(item.pubTime)}}</div>
                    </div>
                    <div class="art_data box_flex">
                      <span class="box_flex_1 zf stat_data">{{numFixed(item.spreadNum)}}</span>
                      <span class="box_flex_1 pl stat_data">{{numFixed(item.commentNum)}}</span>
                      <span class="box_flex_1 dz stat_data">{{numFixed(item.zanNum)}}</span>
                    </div>
                  </div>
                </li>
                <li id="article_more" class="load_more" style="display: none"></li>
                <li class="no_data" v-if="articleList.length == 0 && articleListFlag">暂无数据,请在24小时后查看</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-if="platType == 3">
      <section class="mediaDetail_zb mediaDetail_wbV3">
        <div class="top">
          <header>
            <div class="detailHead detailHeadNew detailHeadV3">
              <div class="avatar">
                <img v-bind:src="mbInfo.mediaImage" alt="">
                <!-- <i class="id_mark" v-bind:class="[mbInfo.isAuthClass]"></i>-->
              </div>
              <div class="info">
                <div class="md-name">
                  <h4 class="yk els" v-if="mbInfo.type == 3">
                    {{mbInfo.mediaName}}
                                  <span class="md-sex"
                                        v-bind:class="{'male':mbInfo.gender == 1,'female':mbInfo.gender == 2}"></span>
                  </h4>
                  <h4 class="yzb els" v-if="mbInfo.type == 4">
                    {{mbInfo.mediaName}}
                                  <span class="md-sex"
                                        v-bind:class="{'male':mbInfo.gender == 1,'female':mbInfo.gender == 2}"></span>
                  </h4>
                  <!-- <h4 class="dy els" v-if="mbInfo.type == 5">
                       {{mbInfo.mediaName}}
                       <span class="md-sex"
                             v-bind:class="{'male':mbInfo.gender == 1,'female':mbInfo.gender == 2}"></span>
                   </h4>-->
                  <h4 class="hj els" v-if="mbInfo.type == 6">
                    {{mbInfo.mediaName}}
                                  <span class="md-sex"
                                        v-bind:class="{'male':mbInfo.gender == 1,'female':mbInfo.gender == 2}"></span>
                  </h4>
                </div>
                <div class="wxID sub_detail">ID:{{mbInfo.mediaId}}</div>
                <div class="md-labels">
                  <span v-for="item in mbInfo.tagList || []">{{item}}</span>
                </div>
                <div class="yizhibo_fans">
                  {{mbInfo.fansNum}}粉丝
                </div>
              </div>
              <div class="Introduction">
                <div class="brief els" v-if="briefShowState">
                  {{mbInfo.brief.length != 0 ? mbInfo.brief : '暂无简介'}}
                </div>
                <div class="brief briefShow" v-else>
                  <div>{{mbInfo.brief.length != 0 ? mbInfo.brief : '暂无简介'}}</div>
                  <div class="zhibo_identity">身份信息: {{mbInfo.authInfo.length != 0 ? mbInfo.authInfo :
                    '暂无认证'}}
                  </div>
                </div>
                <div class="drawer fl" v-on:click="briefShowState = !briefShowState">
                              <span v-if="briefShowState">
                                  展开<i class="arrow-down"></i>
                              </span>
                              <span v-else>
                                  收起<i class="arrow-up"></i>
                              </span>
                </div>
              </div>
              <div class="detail_sum box_flex">
                <div class="box_flex_1"><em>{{numFixed(mbInfo.dealNum)}}</em>累计成交</div>
                <div class="box_flex_1"><em>{{numFixed(mbInfo.collectedUserCount)}}</em>收藏</div>
              </div>
            </div>
          </header>
        </div>
        <div class="media_main">
          <div class="mediaMenu box_flex">
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 0}" v-on:click="currMenu = 0">卖家介绍</div>
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 1}" v-on:click="currMenu = 1">媒体数据</div>
            <div class="box_flex_1" v-bind:class="{'curr':currMenu == 2}" v-on:click="currMenu = 2">近期发布</div>
          </div>
          <div class="platCont">
            <div class="sellInfo" v-show="currMenu == 0">
              <ul class="list_cntr sell_list">
                <li v-for="item in sellList" v-on:click="handleClickSellList">
                  <div class="img_head_cntr">
                    <img class="head_icon" alt="" v-bind:src="item.userInfo.userImage">
                  </div>
                  <div class="list_detail">
                    <div class="sell-desc els"
                         v-bind:class="{authed:item.userInfo.authType.indexOf('3') != -1}">
                      {{item.userInfo.userName}}
                    </div>
                    <div class="sell_judge">卖家好评率{{Math.round(item.userInfo.goodCmt * 100)}}%</div>
                  </div>
                  <div class="price cf">
                    <div v-for="item,index in item.productInfo.goods" class="fl" :key="item.goodsId"
                         v-bind:class="{'fr': (index + 1) % 2 == 0,'fl':(index+1)%2 != 0 }">
                      <span class="txt">{{item.goodsDesc}}</span>
                      <span class="sell-price">{{(item.price == -1 || !item.price) ? '--' : '¥'+(item.price / 100).toFixed(2)}}</span>
                    </div>
                  </div>
                  <span class="buy_btn">购买</span>
                </li>
                <li id="sell_more" class="load_more" style="display: none"></li>
                <li class="no_data" v-if="sellList.length == 0 && sellFlag">
                  <p>已经有 {{RandomNumBoth(15,30)}} 个买家 求购此媒体</p>
                  <a href="javascript:;" v-on:click="toDownload">立即认领</a>
                </li>
              </ul>
              <!--<ul class="list_cntr sell_list" v-if="sellList.length == 0 && sellFlag">

              </ul>-->
            </div>
            <div class="mediaData" v-show="currMenu == 1">
              <div class="data_cntr day30">
                <div class="statis_data_cntr">
                  <div class="media_sum">
                    <ul class="statis_line_1 box_flex">
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.maxLookNum}}</p>

                        <p>最高观众数</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.avgLookNum}}</p>

                        <p>平均观众数</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.totalAmount}}</p>

                        <p>收到打赏</p>
                      </li>
                    </ul>
                    <ul class="statis_line_2 box_flex">
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.totalReward}}</p>

                        <p>累计收入</p>
                      </li>
                      <li class="box_flex_1 brn">
                        <p class="red_num">{{statistics.totalZan}}</p>

                        <p>总点赞</p>
                      </li>
                      <li class="box_flex_1 brn">

                      </li>
                    </ul>
                  </div>
                  <div class="charts">
                    <h1>
                      近30日粉丝变化趋势图
                    </h1>
                    <div class="chart_charts" id="lineChart1" style="width:3.47rem;height: 2rem;"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="recentArticle" v-show="currMenu == 2">
              <div class="tab_cntr">
                排序方式
                <div class="open1">
                  <span>按时间</span>
                  <span>按热度</span>
                  <input type="checkbox" v-model="checkQueue">
                </div>
              </div>
              <ul class="list_cntr article_list">
                <li v-for="item in articleList" v-on:click="goLinkArticle(item.url)">
                  <div class="img_head_cntr">
                    <div class="head_icon">
                      <Pic :src="item.coverPlan"></Pic>
                    </div>
                  </div>
                  <div class="list_detail">
                    <div class="list_desc">
                      <div class="art_title">{{item.title}}</div>
                      <div class="articleTime">{{formatPubtime(item.pubTime)}}</div>
                    </div>
                    <div class="art_data box_flex" v-if="item.type == 3">
                      <span class="box_flex_1 ln stat_data">{{numFixed(item.lookNum)}}</span>
                      <!--<span class="box_flex_1 pl stat_data">{{numFixed(item.commentNum)}}</span>
                      <span class="box_flex_1 dz stat_data">{{numFixed(item.zanNum)}}</span>-->
                    </div>
                    <div class="art_data box_flex" v-if="item.type == 6">
                      <span class="box_flex_1 ln stat_data">{{numFixed(item.lookNum)}}</span>
                      <!--<span class="box_flex_1 pl stat_data">{{numFixed(item.commentNum)}}</span>-->
                      <span class="box_flex_1 dz stat_data">{{numFixed(item.zanNum)}}</span>
                    </div>
                    <div class="art_data box_flex" v-if="item.type == 4">
                      <span class="box_flex_1 ln stat_data">{{numFixed(item.lookNum)}}</span>
                      <span class="box_flex_1 pl stat_data">{{numFixed(item.commentNum)}}</span>
                      <span class="box_flex_1 dz stat_data">{{numFixed(item.zanNum)}}</span>
                    </div>
                  </div>
                </li>
                <li id="article_more" class="load_more" style="display: none"></li>
                <li class="no_data" v-if="articleList.length == 0 && articleListFlag">暂无数据,请在24小时后查看</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </template>
    <footer class="mediaAdd_footer">
      <a class="btn btn_add" v-on:click.stop="toAdd">收藏</a>
      <div class="download_bar cf">
        <img class="fl" src="../../public/img/logo2.png" alt="">
        <span class="fl">品推宝－优质媒体 自由交易</span>
        <a class="btn_dl fr" v-on:click="toDownload">立即下载</a>
      </div>
    </footer>
    <Layer :layerMsg="layerMsg"></Layer>
  </div>
</template>
<script>
  import '../../public/js/init.js'
  import utils from '../../public/js/utils'
  import mediaService from '../../service/mediaService.js'
  import shopService from '../../service/shopService.js'
  import Layer from '../../components/common/Layer'
  import share from '../../public/js/share'
  import  '../../public/css/vendors.css'

  var Pic = {
    template:'<div v-html="showImg(src)"></div>',
    props: ['src'],
    methods:{
      showImg (url) {
        var id = 'imgIfr' + imgIfrCount++;
        parent.imgSrc[id] = '<img " src=\'' + url + '\' style="width:100%;height:100%; display:block;border-radius:.03rem;position:absolute;left:0;top:0;"/>';
        return '<iframe src="javascript:parent.imgSrc[\'' + id + '\'];" frameBorder="0" scrolling="no" style="width:.8rem;height:.8rem;overflow: hidden;"></iframe>';
      }
    }
  };
  var token = utils.cookie.get('pintui-token');
  var ratio = 1;
  var platform = '';
  if (utils.urlParam('platform') == 'wx') {
    platform = '&platform=wx';
  }
  /*微信登录*/
  if (utils.urlParam('nickName')) {
    utils.cookie.set('pintui-nickName', encodeURIComponent(utils.urlParam('nickName')), 7);
  }
  if (utils.urlParam('headImage')) {
    utils.cookie.set('pintui-headImage', utils.urlParam('headImage'), 7);
  }
  if (utils.urlParam('token')) {
    utils.cookie.set('pintui-token', utils.urlParam('token'), 7);
  }
  var pMids = decodeURIComponent(utils.urlParam('pMid')),
    type = parseInt(utils.urlParam('type')),
    platType = parseInt(utils.urlParam('plattype'));
  parent.imgSrc = {};
  var imgIfrCount = 0;
  export default {
    name: 'mediaDetail',
    components: {Layer,Pic},
    data () {
      return {
        layerMsg: '',
        platType: platType,
        type: type,
        detailLoaded: false,
        mbInfo: {
          pMid: '',
          collection: 1,
          type: 1,
          mediaName: '',
          mediaId: '',
          mediaImage: '',
          isAuth: 1,
          authInfo: '',
          brief: '',
          addTime: '',
          isOriginal: 0,
          collectedUserCount: 0
        },
        statistics: {
          pubNum: 0,
          pubArticle: 0,
          totalZan: 0,
          swjrArticle: 0,
          hlavGread: 0,
          hlavgZan: 0
        },
        briefShowState: true,
        currMenu: 0,
        sellList: [],
        totalSellNum: 0,
        sellFlag: false,
        totalDealNum: 0,
        articleList: [],
        totalArticleNum: 0,
        articleListFlag: false,
        checkQueue: true,
        checkData: true
      }
    },
    created(){
      this.postMediaDetail();
      this.postMediaArticleList('recent', 0, 10);
      this.postSellList(0, 10);
    },
    watch: {
      checkQueue: function () {
        this.articleList = [];
        this.articleListFlag = false;
        if (this.checkQueue) {
          this.postMediaArticleList('recent', 0, 10);
        } else {
          this.postMediaArticleList('hot', 0, 10);
        }
      }
    },
    methods: {
      userDetail () {
        window.location.href = 'userDetail.html?pMid=' + pMids + '&type=' + type + '&mediaId=' + this.mbInfo.mediaId;
      },
      goLink (url) {
        window.location.href = url;
      },
      dealAvgPrice (price) {
        price = price / 100;
        if ((price) >= 10000) {
          return (price / 10000).toFixed(1) + '万';
        } else {
          switch (Math.floor(price).toString().length) {
            case 1:
              return Math.round(price);
              break;
            case 2:
              return Math.round(Math.floor(price) / 10) * 10;
              break;
            case 3:
              return Math.round(Math.floor(price) / 100) * 100;
              break;
            case 4:
              return Math.round(Math.floor(price) / 100) * 100;
              break;
          }
        }
      },
      toArticle () {
        window.location.href = 'articleList.html?pMid=' + pMids + '&type=' + type;
      },
      displayTip (obj, index) {
        var _tipInfo = $(obj).find('h1 b').eq(index).next();
        if (_tipInfo.is(':hidden')) {
          _tipInfo.show();
        } else {
          _tipInfo.hide();
        }
      },
      showImg (url) {
        var id = 'imgIfr' + imgIfrCount++;
        parent.imgSrc[id] = '<img " src=\'' + url + '\' style="width:100%;height:100%; display:block;border-radius:.03rem;position:absolute;left:0;top:0;"/>';
        return '<iframe src="javascript:parent.imgSrc[\'' + id + '\'];" frameBorder="0" scrolling="no" style="width:.8rem;height:.8rem;overflow: hidden;"></iframe>';
      },
      formatPubtime (time) {
        function add0(m) {
          return m < 10 ? '0' + m : m
        }

        var time = new Date(time);
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var y = time.getFullYear();
        var h = time.getHours();
        var mm = time.getMinutes();
        return add0(m) + '月' + add0(d) + '日';
      },
      numFixed (data) {
        if (data == -1) {
          return "- -";
        } else if ((parseInt(data) / 10000) >= 1) {
          return parseFloat(data / 10000).toFixed(1) + '万';
        } else {
          return data;
        }
      },
      toAdd() {
        if (token) {
          this.postMediaAdd();
        } else {
          window.location.href = 'loginReg.html?returnUrl=' + encodeURIComponent(window.location.href) + platform;
        }
      },
      toDownload() {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shvnya.ptb';
      },
      goLinkArticle(url) {
        window.location.href = 'articleShow.html?articleUrl=' + encodeURIComponent(url) + '&type=' + type;
      },
      handleClickSellList() {
        this.layerMsg = '请通过品推宝APP，进行媒体购买';
        setTimeout(()=> {
          this.layerMsg = ''
        }, 2000)
      },
      RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
      },
      postMediaAdd(){
        var data = {pMidList: [{"pMid": pMids, "type": type}]};
        if (utils.urlParam('platform') == 'wx') {
          data = {pMidList: [{"pMid": pMids, "type": type}]};
        }
        shopService.mediaAddBatchMix(data, ()=> {
          window.location.href = 'result.html?flag="true"';
        }, ()=> {
          this.layerMsg = '登录过期，请重新登录';
          utils.cookie.del('pintui-token');
          setTimeout(()=> {
            window.location.href = 'loginReg.html?returnUrl=' + encodeURIComponent(window.location.href) + platform;
          }, 1000)
        });
      },
      postMediaDetail(){
        var data = {pMid: pMids, type: type};
        mediaService.mediaDetail(data, (data)=> {
          this.detailLoaded = true;
          this.mbInfo = data.mbInfo;
          this.totalDealNum = data.totalDealNum;
          var fansNum = parseInt(data.mbInfo.fansNum) >= 0 ? parseInt(data.mbInfo.fansNum) : 0;
          var fansNumData = fansNum / 10000;
          this.mbInfo.fansNum = fansNumData >= 1 ? parseFloat(fansNumData).toFixed(1) + '万' : fansNum;

          var colloctNum = parseInt(data.mbInfo.collectedUserCount) >= 0 ? parseInt(data.mbInfo.collectedUserCount) : 0;
          var colloctData = colloctNum / 10000;
          this.mbInfo.collectedUserCount = colloctData >= 1 ? parseFloat(colloctData).toFixed(1) + '万' : colloctNum;
          //this.mbInfo.isAuthClass = authClass[data.mbInfo.type][data.mbInfo.isAuth];
          this.statistics = floatNum(data.statistics, 10000, '万');
          utils.getScript('https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js',()=>{
            utils.getScript('https://cdn.bootcss.com/highcharts/4.2.5/highcharts.js',()=>{
              if (platType != 3) {
                renderChart(data);
                renderChart30(data);
              }
              if (platType == 3) {
                renderChartZhibo(data);
              }
            })
          })
          var desc = '我在品推宝关注TA';
          share.shareTx(desc + ':' + data.mbInfo.mediaName,desc);
        }, (data)=> {
          this.layerMsg = data.message;
          setTimeout(()=> {
            this.layerMsg = ''
          }, 2000)
        });
      },
      postMediaArticleList(atype, start, end){
        $('#article_more').show();
        var data = {
          pMid: pMids,
          type: type,
          atype: atype,
          start: start,
          end: end
        };
        mediaService.mediaArticleList(data, (data)=> {
          $('#article_more').hide();
          this.totalArticleNum = data.totalNum;
          this.articleList = this.articleList.concat(data.list);
          this.articleListFlag = true;
        }, (data)=> {
          this.layerMsg = data.message;
          setTimeout(()=> {
            this.layerMsg = ''
          }, 2000)
        });
      },
      postSellList(start, end){
        $('#sell_more').show();
        var data = {pMid: pMids, type: type, start: start, end: end};
        shopService.productSoldList(data, (data)=> {
          $('#sell_more').hide();
          this.totalSellNum = data.totalNum;
          this.sellList = this.sellList.concat(data.list);
          this.sellFlag = true;
        }, (data)=> {
          this.layerMsg = data.message;
          setTimeout(()=> {
            this.layerMsg = ''
          }, 2000)
        });
      }
    },
    mounted: function () {
      var self = this;
      $(window).scroll(function () {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight >= scrollHeight) {
          if (self.currMenu == 2) {
            if (self.articleList.length == self.totalArticleNum) {
              //没有更多数据啦
            } else {
              if (self.checkQueue) {
                self.postMediaArticleList('recent', self.articleList.length, self.articleList.length + 10);
              } else {
                self.postMediaArticleList('hot', self.articleList.length, self.articleList.length + 10);
              }
            }
          } else if (self.currMenu == 0) {
            if (self.sellList.length == self.totalSellNum) {
              //没有更多数据啦
            } else {
              self.postSellList(self.sellList.length, self.sellList.length + 10);
            }
          }
        }
      });
    }
  }

  function renderChartZhibo(data) {
    var hlRead;

    hlRead = returnSort(data.fansData) || [];
    Highcharts.setOptions({
      colors: ['#FFC72F', '#FFAB90', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });
    Highcharts.setOptions({global: {useUTC: false}});
    var defaultConfig = {
      title: {
        text: ''
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false //是否显示
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        area: {
          stacking: '',
          lineColor: '#FFC72F',
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
              enabled: false
            }
          },
          marker: {
            enabled: false
          }
        }
      }
    };
    if (hlRead.length > 0) {
      $('#lineChart1').highcharts($.extend(defaultConfig, {
        xAxis: {
          categories: returnTime(hlRead),
          tickInterval: 7,
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%m.%e', this.value);
            }
          }
        },
        series: [{
          type: 'area',
          fillColor: {
            linearGradient: [500, 500, 0, 0],
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          data: returnNum(hlRead)
        }]
      }));
    }
  }

  function renderChart30(data) {
    var hlRead, sdRead, tdRead;

    if (data.mbInfo.type == 1) {
      hlRead = returnSort(data.hlRead30) || [];
      sdRead = returnSort(data.sdRead30) || [];
      tdRead = returnSort(data.tdRead30) || [];
    } else {
      hlRead = returnSort(data.spread30) || [];
      sdRead = returnSort(data.comment30) || [];
      tdRead = returnSort(data.zan30) || [];
    }
    Highcharts.setOptions({
      colors: ['#FFC72F', '#FFAB90', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });
    Highcharts.setOptions({global: {useUTC: false}});
    var defaultConfig = {
      title: {
        text: ''
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false //是否显示
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        area: {
          stacking: '',
          lineColor: '#FFC72F',
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
              enabled: false
            }
          },
          marker: {
            enabled: false
          }
        }
      }
    };
    if (hlRead.length > 0) {
      $('#lineChart1').highcharts($.extend(defaultConfig, {
        xAxis: {
          categories: returnTime(hlRead),
          tickInterval: 7,
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%m.%e', this.value);
            }
          }
        },
        series: [{
          type: 'area',
          fillColor: {
            linearGradient: [500, 500, 0, 0],
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          data: returnNum(hlRead)
        }]
      }));
    }
    if (sdRead.length > 0) {
      $('#lineChart2').highcharts($.extend(defaultConfig, {
        xAxis: {
          categories: returnTime(sdRead),
          tickInterval: 7,
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%m.%e', this.value);
            }
          }
        },
        series: [{
          type: 'area',
          fillColor: {
            linearGradient: [500, 500, 0, 0],
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          data: returnNum(sdRead)
        }]
      }));
    }
    if (tdRead.length > 0) {
      $('#lineChart3').highcharts($.extend(defaultConfig, {
        xAxis: {
          categories: returnTime(tdRead),
          tickInterval: 7,
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%m.%e', this.value);
            }
          }
        },
        series: [{
          type: 'area',
          fillColor: {
            linearGradient: [500, 500, 0, 0],
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          data: returnNum(tdRead)
        }]
      }));
    }
  }

  function classifyChartData(array) {
    var obj = {
      time: [],
      num: []
    };
    array.forEach(function (em) {
      var date = new Date(parseInt(em.time));
      obj.time.push((date.getMonth() + 1) + '.' + date.getDate());
      obj.num.push(em.num);
    });
    return obj;
  }

  function floatNum(obj, ratio, str) {
    for (var key in obj) {
      if (parseInt(obj[key]) < 0) {
        obj[key] = '- -';
      } else {
        var data = parseInt(obj[key]) / ratio;
        obj[key] = data >= 1 ? parseFloat(data).toFixed(1) + str : obj[key];
      }
    }
    return obj;
  }

  function returnNum(array) {
    return array.map(function (data) {
      return data.num;
    });
  }

  function returnTime(array) {
    return array.map(function (data) {
      return data.time;
    });
  }

  function returnSort(obj) {
    return obj.sort(function (a, b) {
      return a.time > b.time ? 1 : -1;
    })
  }

  function renderChart(data) {
    var hlRead, sdRead, tdRead;
    if (data.mbInfo.type == 1) {
      hlRead = data.hlRead && classifyChartData(data.hlRead) || [];
      sdRead = data.sdRead && classifyChartData(data.sdRead) || [];
      tdRead = data.tdRead && classifyChartData(data.tdRead) || [];
    } else {
      hlRead = data.spread && classifyChartData(data.spread) || [];
      sdRead = data.comment && classifyChartData(data.comment) || [];
      tdRead = data.zan && classifyChartData(data.zan) || [];
    }

    var defaultConfig = {
      chart: {
        type: 'column',
        style: {'border-radius': '5px'}
      },
      yAxis: {
        title: {
          enabled: false
          // text:'暂无数据，请24小时后查看'
        },
        labels: {
          padding: 0,
          x: -5,
          style: {'color': '#1a1a1a'}
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        headerFormat: '',
        hideDelay: 99999,
        pointFormat: '<span style="padding:0;color:#fff;">{point.y}</span>',
        backgroundColor: '#FFC72F',
        shared: false,
        style: {'padding': '2px'}
      },
      plotOptions: {
        column: {
          pointWidth: 10,
          pointPadding: 0,
          borderWidth: 0,
          color: '#FFC72F',
          borderRadius: 0,
          events: {
            click: function (e) {
              for (var i = 0; i < e.point.series.data.length; i++) {
                var temp = e.point.series.data[i];
                if (temp.color == '#FFC72F') {
                  e.point.series.data[i].color = '#FFC72F';//去掉已点击的颜色
                  e.point.series.data[i].update(e.point.series.data[i]);
                  break;
                }
              }
              e.point.color = '#FFC72F';
              e.point.update(e.point);
            }
          }
        }
      },
      plotBands: {
        color: 'red'
      }
    };
    var defaultNoData = {
      subtitle: {
        text: '暂无数据，请24小时后查看',
        floating: true,
        // verticalAlign:'middle',
        y: 80
      }
    };
    // charts1 //data.hlRead && data.
    if (hlRead.num.length > 0) {
      $('#charts1').highcharts($.extend(defaultConfig, {
        title: {
          text: ''/*data.mbInfo.type == 1 ? '头条阅读数' : '日总转发'*/,
          align: 'left',
          style: {'color': '#333', 'fontSize': '0.14rem', 'line-height': '.18rem'},
          y: 10
        },
        xAxis: {
          /*title: {
           // enabled:false,
           text: data.mbInfo.type == 1 ? '柱状图的高度为该发布日的文章,从发布日至昨日的阅读总数' : '柱状图的高度为该发布日的文章,从发布日至昨日的转发总数',
           style: {'font-size': '.09rem', 'color': '#1a1a1a'},
           align: 'middle'
           },*/
          categories: hlRead.time || [],
          crosshair: {color: '#f1f1f1'},
          labels: {
            autoRotation: false,
            style: {'color': '#1a1a1a'}
          }
        },
        series: [{
          name: '',
          data: hlRead.num || []
        }]
      }));
    } else {
      $('#charts1').highcharts($.extend(defaultConfig, {
        title: {
          text: ''/*data.mbInfo.type == 1 ? '头条阅读数' : '日总转发'*/,
          align: 'left',
          style: {'color': '#333', 'fontSize': '0.14rem', 'line-height': '.18rem'},
          y: 10
        },
        xAxis: {
          /*title: {
           // enabled:false,
           text: data.mbInfo.type == 1 ? '柱状图的高度为该发布日的文章,从发布日至昨日的阅读总数' : '柱状图的高度为该发布日的文章,从发布日至昨日的转发总数',
           style: {'font-size': '.09rem', 'color': '#1a1a1a'},
           align: 'middle'
           },*/
          categories: hlRead.time || [],
          crosshair: {color: '#f1f1f1'},
          labels: {
            autoRotation: false,
            style: {'color': '#1a1a1a'}
          }
        },
        series: [{
          name: '',
          data: hlRead.num || []
        }]
      }, defaultNoData));
    }
    // charts2 // data.sdRead && data.
    if (sdRead.num.length > 0) {
      $('#charts2').highcharts($.extend(defaultConfig, {
        title: {
          text: ''/*data.mbInfo.type == 1 ?'二条阅读数' : '日总点赞'*/,
          align: 'left',
          style: {'color': '#333', 'fontSize': '0.14rem', 'line-height': '.18rem'},
          y: 10
        },
        xAxis: {
          /*title: {
           // enabled:false
           text: data.mbInfo.type == 1 ? '柱状图的高度为该发布日的文章,从发布日至昨日的阅读总数' : '柱状图的高度为该发布日的文章,从发布日至昨日的点赞总数',
           style: {'font-size': '.09rem', 'color': '#1a1a1a'},
           align: 'middle'
           },*/
          categories: sdRead.time || [],
          crosshair: {color: '#f1f1f1'},
          labels: {
            autoRotation: false,
            style: {'color': '#1a1a1a'}
          }
        },
        series: [{
          name: '',
          data: sdRead.num || []
        }]
      }));
    } else {
      $('#charts2').highcharts($.extend(defaultConfig, {
        title: {
          text: ''/*data.mbInfo.type == 1 ?'二条阅读数' : '日总点赞'*/,
          align: 'left',
          style: {'color': '#333', 'fontSize': '0.14rem', 'line-height': '.18rem'},
          y: 10
        },
        xAxis: {
          /*title: {
           // enabled:false
           text: data.mbInfo.type == 1 ? '柱状图的高度为该发布日的文章,从发布日至昨日的阅读总数' : '柱状图的高度为该发布日的文章,从发布日至昨日的点赞总数',
           style: {'font-size': '.09rem', 'color': '#1a1a1a'},
           align: 'middle'
           },*/
          categories: sdRead.time || [],
          crosshair: {color: '#f1f1f1'},
          labels: {
            autoRotation: false,
            style: {'color': '#1a1a1a'}
          }
        },
        series: [{
          name: '',
          data: sdRead.num || []
        }]
      }, defaultNoData));
    }
    // charts3 //data.tdRead && data.
    if (tdRead.num.length > 0) {
      $('#charts3').highcharts($.extend(defaultConfig, {
        title: {
          text: ''/*data.mbInfo.type == 1 ?'三条阅读数' : '日总评论'*/,
          align: 'left',
          style: {'color': '#333', 'fontSize': '0.14rem', 'line-height': '.18rem'},
          y: 10
        },
        xAxis: {
          /*title: {
           // enabled:false
           text: data.mbInfo.type == 1 ? '柱状图的高度为该发布日的文章,从发布日至昨日的阅读总数' : '柱状图的高度为该发布日的文章,从发布日至昨日的评论总数',
           style: {'font-size': '.09rem', 'color': '#1a1a1a'},
           align: 'middle'
           },*/
          categories: tdRead.time || [],
          crosshair: {color: '#f1f1f1'},
          labels: {
            autoRotation: false,
            style: {'color': '#1a1a1a'}
          }
        },
        series: [{
          name: '',
          data: tdRead.num || []
        }]
      }));
    } else {
      $('#charts3').highcharts($.extend(defaultConfig, {
        title: {
          text: ''/*data.mbInfo.type == 1 ?'三条阅读数' : '日总评论'*/,
          align: 'left',
          style: {'color': '#333', 'fontSize': '0.14rem', 'line-height': '.18rem'},
          y: 10
        },
        xAxis: {
          /* title: {
           // enabled:false
           text: data.mbInfo.type == 1 ? '柱状图的高度为该发布日的文章,从发布日至昨日的阅读总数' : '柱状图的高度为该发布日的文章,从发布日至昨日的评论总数',
           style: {'font-size': '.09rem', 'color': '#1a1a1a'},
           align: 'middle'
           },*/
          categories: tdRead.time || [],
          crosshair: {color: '#f1f1f1'},
          labels: {
            autoRotation: false,
            style: {'color': '#1a1a1a'}
          }
        },
        series: [{
          name: '',
          data: tdRead.num || []
        }]
      }, defaultNoData));
    }
  }
</script>

<style>
  body {
    background: #F7F8FA;
  }
</style>
