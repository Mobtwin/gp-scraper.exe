import dotenv from "dotenv";
dotenv.config();


const proxies_1 = [
  "54.36.110.194:18547:owenislaa:WnEJVYQZFL",
"54.36.110.194:18552:owenislaa:WnEJVYQZFL",
"54.36.110.194:18957:owenislaa:WnEJVYQZFL",
"54.36.110.194:18888:owenislaa:WnEJVYQZFL",
"54.36.110.194:18945:owenislaa:WnEJVYQZFL",
"54.36.110.194:18909:owenislaa:WnEJVYQZFL",
"54.36.110.194:18936:owenislaa:WnEJVYQZFL",
"54.36.110.194:18548:owenislaa:WnEJVYQZFL",
"54.36.110.194:18912:owenislaa:WnEJVYQZFL",
"54.36.110.194:18897:owenislaa:WnEJVYQZFL",
"54.36.110.194:18555:owenislaa:WnEJVYQZFL",
"54.36.110.194:18928:owenislaa:WnEJVYQZFL",
"54.36.110.194:18919:owenislaa:WnEJVYQZFL",
"54.36.110.194:18943:owenislaa:WnEJVYQZFL",
"54.36.110.194:18934:owenislaa:WnEJVYQZFL",
"54.36.110.194:18946:owenislaa:WnEJVYQZFL",
"54.36.110.194:18902:owenislaa:WnEJVYQZFL",
"54.36.110.194:18927:owenislaa:WnEJVYQZFL",
"54.36.110.194:18920:owenislaa:WnEJVYQZFL",
"54.36.110.194:18887:owenislaa:WnEJVYQZFL",
"54.36.110.194:18889:owenislaa:WnEJVYQZFL",
"54.36.110.194:18947:owenislaa:WnEJVYQZFL",
"54.36.110.194:18949:owenislaa:WnEJVYQZFL",
"54.36.110.194:18958:owenislaa:WnEJVYQZFL",
"54.36.110.194:18901:owenislaa:WnEJVYQZFL",
"54.36.110.194:18559:owenislaa:WnEJVYQZFL",
"54.36.110.194:18922:owenislaa:WnEJVYQZFL",
"54.36.110.194:18924:owenislaa:WnEJVYQZFL",
"54.36.110.194:18903:owenislaa:WnEJVYQZFL",
"54.36.110.194:18885:owenislaa:WnEJVYQZFL",
"54.36.110.194:18925:owenislaa:WnEJVYQZFL",
"54.36.110.194:18910:owenislaa:WnEJVYQZFL",
"54.36.110.194:18954:owenislaa:WnEJVYQZFL",
"54.36.110.194:18923:owenislaa:WnEJVYQZFL",
"54.36.110.194:18542:owenislaa:WnEJVYQZFL",
"54.36.110.194:18543:owenislaa:WnEJVYQZFL",
"54.36.110.194:18884:owenislaa:WnEJVYQZFL",
"54.36.110.194:18553:owenislaa:WnEJVYQZFL",
"54.36.110.194:18907:owenislaa:WnEJVYQZFL",
"54.36.110.194:18549:owenislaa:WnEJVYQZFL",
"54.36.110.194:18948:owenislaa:WnEJVYQZFL",
"54.36.110.194:18930:owenislaa:WnEJVYQZFL",
"54.36.110.194:18558:owenislaa:WnEJVYQZFL",
"54.36.110.194:18917:owenislaa:WnEJVYQZFL",
"54.36.110.194:18905:owenislaa:WnEJVYQZFL",
"54.36.110.194:18554:owenislaa:WnEJVYQZFL",
"54.36.110.194:18935:owenislaa:WnEJVYQZFL",
"54.36.110.194:18550:owenislaa:WnEJVYQZFL",
"54.36.110.194:18893:owenislaa:WnEJVYQZFL",
"54.36.110.194:18895:owenislaa:WnEJVYQZFL",
"54.36.110.194:18914:owenislaa:WnEJVYQZFL",
"54.36.110.194:18932:owenislaa:WnEJVYQZFL",
"54.36.110.194:18938:owenislaa:WnEJVYQZFL",
"54.36.110.194:18939:owenislaa:WnEJVYQZFL",
"54.36.110.194:18956:owenislaa:WnEJVYQZFL",
"54.36.110.194:18890:owenislaa:WnEJVYQZFL",
"54.36.110.194:18941:owenislaa:WnEJVYQZFL",
"54.36.110.194:18556:owenislaa:WnEJVYQZFL",
"54.36.110.194:18891:owenislaa:WnEJVYQZFL",
"54.36.110.194:18908:owenislaa:WnEJVYQZFL",
"54.36.110.194:18951:owenislaa:WnEJVYQZFL",
"54.36.110.194:18883:owenislaa:WnEJVYQZFL",
"54.36.110.194:18541:owenislaa:WnEJVYQZFL",
"54.36.110.194:18959:owenislaa:WnEJVYQZFL",
"54.36.110.194:18955:owenislaa:WnEJVYQZFL",
"54.36.110.194:18915:owenislaa:WnEJVYQZFL",
"54.36.110.194:18929:owenislaa:WnEJVYQZFL",
"54.36.110.194:18911:owenislaa:WnEJVYQZFL",
"54.36.110.194:18918:owenislaa:WnEJVYQZFL",
"54.36.110.194:18544:owenislaa:WnEJVYQZFL",
"54.36.110.194:18913:owenislaa:WnEJVYQZFL",
"54.36.110.194:18933:owenislaa:WnEJVYQZFL",
"54.36.110.194:18898:owenislaa:WnEJVYQZFL",
"54.36.110.194:18892:owenislaa:WnEJVYQZFL",
"54.36.110.194:18546:owenislaa:WnEJVYQZFL",
"54.36.110.194:18900:owenislaa:WnEJVYQZFL",
"54.36.110.194:18921:owenislaa:WnEJVYQZFL",
"54.36.110.194:18950:owenislaa:WnEJVYQZFL",
"54.36.110.194:18940:owenislaa:WnEJVYQZFL",
"54.36.110.194:18551:owenislaa:WnEJVYQZFL",
"54.36.110.194:18952:owenislaa:WnEJVYQZFL",
"54.36.110.194:18926:owenislaa:WnEJVYQZFL",
"54.36.110.194:18557:owenislaa:WnEJVYQZFL",
"54.36.110.194:18937:owenislaa:WnEJVYQZFL",
"54.36.110.194:18899:owenislaa:WnEJVYQZFL",
"54.36.110.194:18894:owenislaa:WnEJVYQZFL",
"54.36.110.194:18944:owenislaa:WnEJVYQZFL",
"54.36.110.194:18931:owenislaa:WnEJVYQZFL",
"54.36.110.194:18904:owenislaa:WnEJVYQZFL",
"54.36.110.194:18916:owenislaa:WnEJVYQZFL",
"54.36.110.194:18886:owenislaa:WnEJVYQZFL",
"54.36.110.194:18881:owenislaa:WnEJVYQZFL",
"54.36.110.194:18880:owenislaa:WnEJVYQZFL",
"54.36.110.194:18953:owenislaa:WnEJVYQZFL",
"54.36.110.194:18896:owenislaa:WnEJVYQZFL",
"54.36.110.194:18560:owenislaa:WnEJVYQZFL",
"54.36.110.194:18906:owenislaa:WnEJVYQZFL",
"54.36.110.194:18545:owenislaa:WnEJVYQZFL",
"54.36.110.194:18882:owenislaa:WnEJVYQZFL",
"54.36.110.194:18942:owenislaa:WnEJVYQZFL",
"54.36.110.194:12386:owenislaa:WnEJVYQZFL",
"54.36.110.194:12928:owenislaa:WnEJVYQZFL",
"54.36.110.194:13293:owenislaa:WnEJVYQZFL",
"54.36.110.194:12523:owenislaa:WnEJVYQZFL",
"54.36.110.194:15480:owenislaa:WnEJVYQZFL",
"54.36.110.194:19062:owenislaa:WnEJVYQZFL",
"54.36.110.194:19054:owenislaa:WnEJVYQZFL",
"54.36.110.194:18997:owenislaa:WnEJVYQZFL",
"54.36.110.194:19040:owenislaa:WnEJVYQZFL",
"54.36.110.194:19007:owenislaa:WnEJVYQZFL",
"54.36.110.194:18986:owenislaa:WnEJVYQZFL",
"54.36.110.194:10537:owenislaa:WnEJVYQZFL",
"54.36.110.194:18570:owenislaa:WnEJVYQZFL",
"54.36.110.194:19051:owenislaa:WnEJVYQZFL",
"54.36.110.194:18573:owenislaa:WnEJVYQZFL",
"54.36.110.194:13298:owenislaa:WnEJVYQZFL",
"54.36.110.194:18530:owenislaa:WnEJVYQZFL",
"54.36.110.194:13297:owenislaa:WnEJVYQZFL",
"54.36.110.194:15458:owenislaa:WnEJVYQZFL",
"54.36.110.194:19043:owenislaa:WnEJVYQZFL",
"54.36.110.194:14390:owenislaa:WnEJVYQZFL",
"54.36.110.194:13006:owenislaa:WnEJVYQZFL",
"54.36.110.194:15469:owenislaa:WnEJVYQZFL",
"54.36.110.194:18563:owenislaa:WnEJVYQZFL",
"54.36.110.194:18987:owenislaa:WnEJVYQZFL",
"54.36.110.194:18529:owenislaa:WnEJVYQZFL",
"54.36.110.194:12996:owenislaa:WnEJVYQZFL",
"54.36.110.194:18524:owenislaa:WnEJVYQZFL",
"54.36.110.194:13303:owenislaa:WnEJVYQZFL",
"54.36.110.194:10248:owenislaa:WnEJVYQZFL",
"54.36.110.194:13263:owenislaa:WnEJVYQZFL",
"54.36.110.194:15462:owenislaa:WnEJVYQZFL",
"54.36.110.194:19001:owenislaa:WnEJVYQZFL",
"54.36.110.194:19057:owenislaa:WnEJVYQZFL",
"54.36.110.194:18979:owenislaa:WnEJVYQZFL",
"54.36.110.194:13295:owenislaa:WnEJVYQZFL",
"54.36.110.194:10535:owenislaa:WnEJVYQZFL",
"54.36.110.194:14393:owenislaa:WnEJVYQZFL",
"54.36.110.194:18996:owenislaa:WnEJVYQZFL",
"54.36.110.194:18982:owenislaa:WnEJVYQZFL",
"54.36.110.194:18980:owenislaa:WnEJVYQZFL",
"54.36.110.194:10247:owenislaa:WnEJVYQZFL",
"54.36.110.194:19002:owenislaa:WnEJVYQZFL",
"54.36.110.194:12931:owenislaa:WnEJVYQZFL",
"54.36.110.194:15478:owenislaa:WnEJVYQZFL",
"54.36.110.194:10253:owenislaa:WnEJVYQZFL",
"54.36.110.194:12025:owenislaa:WnEJVYQZFL",
"54.36.110.194:15459:owenislaa:WnEJVYQZFL",
"54.36.110.194:13380:owenislaa:WnEJVYQZFL",
"54.36.110.194:14395:owenislaa:WnEJVYQZFL",
"54.36.110.194:13259:owenislaa:WnEJVYQZFL",
"54.36.110.194:19060:owenislaa:WnEJVYQZFL",
"54.36.110.194:13255:owenislaa:WnEJVYQZFL",
"54.36.110.194:13302:owenislaa:WnEJVYQZFL",
"54.36.110.194:13003:owenislaa:WnEJVYQZFL",
"54.36.110.194:12017:owenislaa:WnEJVYQZFL",
"54.36.110.194:18999:owenislaa:WnEJVYQZFL",
"54.36.110.194:19024:owenislaa:WnEJVYQZFL",
"54.36.110.194:19019:owenislaa:WnEJVYQZFL",
"54.36.110.194:12026:owenislaa:WnEJVYQZFL",
"54.36.110.194:19044:owenislaa:WnEJVYQZFL",
"54.36.110.194:13009:owenislaa:WnEJVYQZFL",
"54.36.110.194:19028:owenislaa:WnEJVYQZFL",
"54.36.110.194:19032:owenislaa:WnEJVYQZFL",
"54.36.110.194:15471:owenislaa:WnEJVYQZFL",
"54.36.110.194:13383:owenislaa:WnEJVYQZFL",
"54.36.110.194:15479:owenislaa:WnEJVYQZFL",
"54.36.110.194:19072:owenislaa:WnEJVYQZFL",
"54.36.110.194:18988:owenislaa:WnEJVYQZFL",
"54.36.110.194:12551:owenislaa:WnEJVYQZFL",
"54.36.110.194:13385:owenislaa:WnEJVYQZFL",
"54.36.110.194:19033:owenislaa:WnEJVYQZFL",
"54.36.110.194:13377:owenislaa:WnEJVYQZFL",
"54.36.110.194:13305:owenislaa:WnEJVYQZFL",
"54.36.110.194:10538:owenislaa:WnEJVYQZFL",
"54.36.110.194:18578:owenislaa:WnEJVYQZFL",
"54.36.110.194:12024:owenislaa:WnEJVYQZFL",
"54.36.110.194:12549:owenislaa:WnEJVYQZFL",
"54.36.110.194:19064:owenislaa:WnEJVYQZFL",
"54.36.110.194:13007:owenislaa:WnEJVYQZFL",
"54.36.110.194:19016:owenislaa:WnEJVYQZFL",
"54.36.110.194:10246:owenislaa:WnEJVYQZFL",
"54.36.110.194:12998:owenislaa:WnEJVYQZFL",
"54.36.110.194:13300:owenislaa:WnEJVYQZFL",
"54.36.110.194:13001:owenislaa:WnEJVYQZFL",
"54.36.110.194:15477:owenislaa:WnEJVYQZFL",
"54.36.110.194:10252:owenislaa:WnEJVYQZFL",
"54.36.110.194:19047:owenislaa:WnEJVYQZFL",
"54.36.110.194:13260:owenislaa:WnEJVYQZFL",
"54.36.110.194:18974:owenislaa:WnEJVYQZFL",
"54.36.110.194:12999:owenislaa:WnEJVYQZFL",
"54.36.110.194:19063:owenislaa:WnEJVYQZFL",
"54.36.110.194:18574:owenislaa:WnEJVYQZFL",
"54.36.110.194:10251:owenislaa:WnEJVYQZFL",
"54.36.110.194:18584:owenislaa:WnEJVYQZFL",
"54.36.110.194:12997:owenislaa:WnEJVYQZFL",
"54.36.110.194:15481:owenislaa:WnEJVYQZFL",
"54.36.110.194:18525:owenislaa:WnEJVYQZFL",
"54.36.110.194:13000:owenislaa:WnEJVYQZFL",
"54.36.110.194:12020:owenislaa:WnEJVYQZFL",
"54.36.110.194:15463:owenislaa:WnEJVYQZFL",
"54.36.110.194:14394:owenislaa:WnEJVYQZFL",
"54.36.110.194:19058:owenislaa:WnEJVYQZFL",
"54.36.110.194:14387:owenislaa:WnEJVYQZFL",
"54.36.110.194:18990:owenislaa:WnEJVYQZFL",
"54.36.110.194:19034:owenislaa:WnEJVYQZFL",
"54.36.110.194:19067:owenislaa:WnEJVYQZFL",
"54.36.110.194:19010:owenislaa:WnEJVYQZFL",
"54.36.110.194:19056:owenislaa:WnEJVYQZFL",
"54.36.110.194:12476:owenislaa:WnEJVYQZFL",
"54.36.110.194:12927:owenislaa:WnEJVYQZFL",
"54.36.110.194:18576:owenislaa:WnEJVYQZFL",
"54.36.110.194:18564:owenislaa:WnEJVYQZFL",
"54.36.110.194:19048:owenislaa:WnEJVYQZFL",
"54.36.110.194:18567:owenislaa:WnEJVYQZFL",
"54.36.110.194:18985:owenislaa:WnEJVYQZFL",
"54.36.110.194:13011:owenislaa:WnEJVYQZFL",
"54.36.110.194:18565:owenislaa:WnEJVYQZFL",
"54.36.110.194:14392:owenislaa:WnEJVYQZFL",
"54.36.110.194:18981:owenislaa:WnEJVYQZFL",
"54.36.110.194:13372:owenislaa:WnEJVYQZFL",
"54.36.110.194:13301:owenislaa:WnEJVYQZFL",
"54.36.110.194:19069:owenislaa:WnEJVYQZFL",
"54.36.110.194:18523:owenislaa:WnEJVYQZFL",
"54.36.110.194:15473:owenislaa:WnEJVYQZFL",
"54.36.110.194:12477:owenislaa:WnEJVYQZFL",
"54.36.110.194:19046:owenislaa:WnEJVYQZFL",
"54.36.110.194:18978:owenislaa:WnEJVYQZFL",
"54.36.110.194:12526:owenislaa:WnEJVYQZFL",
"54.36.110.194:13379:owenislaa:WnEJVYQZFL",
"54.36.110.194:13292:owenislaa:WnEJVYQZFL",
"54.36.110.194:12524:owenislaa:WnEJVYQZFL",
"54.36.110.194:10249:owenislaa:WnEJVYQZFL",
"54.36.110.194:19023:owenislaa:WnEJVYQZFL",
"54.36.110.194:19041:owenislaa:WnEJVYQZFL",
"54.36.110.194:13004:owenislaa:WnEJVYQZFL",
"54.36.110.194:13178:owenislaa:WnEJVYQZFL",
"54.36.110.194:13384:owenislaa:WnEJVYQZFL",
"54.36.110.194:10539:owenislaa:WnEJVYQZFL",
"54.36.110.194:15453:owenislaa:WnEJVYQZFL",
"54.36.110.194:19031:owenislaa:WnEJVYQZFL",
"54.36.110.194:19061:owenislaa:WnEJVYQZFL",
"54.36.110.194:12021:owenislaa:WnEJVYQZFL",
"54.36.110.194:13012:owenislaa:WnEJVYQZFL",
"54.36.110.194:12527:owenislaa:WnEJVYQZFL",
"54.36.110.194:12525:owenislaa:WnEJVYQZFL",
"54.36.110.194:18976:owenislaa:WnEJVYQZFL",
"54.36.110.194:18561:owenislaa:WnEJVYQZFL",
"54.36.110.194:19029:owenislaa:WnEJVYQZFL",
"54.36.110.194:13261:owenislaa:WnEJVYQZFL",
"54.36.110.194:13264:owenislaa:WnEJVYQZFL",
"54.36.110.194:13296:owenislaa:WnEJVYQZFL",
"54.36.110.194:19025:owenislaa:WnEJVYQZFL",
"54.36.110.194:10540:owenislaa:WnEJVYQZFL",
"54.36.110.194:15468:owenislaa:WnEJVYQZFL",
"54.36.110.194:13013:owenislaa:WnEJVYQZFL",
"54.36.110.194:15470:owenislaa:WnEJVYQZFL",
"54.36.110.194:12023:owenislaa:WnEJVYQZFL",
"54.36.110.194:12929:owenislaa:WnEJVYQZFL",
"54.36.110.194:10533:owenislaa:WnEJVYQZFL",
"54.36.110.194:13258:owenislaa:WnEJVYQZFL",
"54.36.110.194:18580:owenislaa:WnEJVYQZFL",
"54.36.110.194:19038:owenislaa:WnEJVYQZFL",
"54.36.110.194:18526:owenislaa:WnEJVYQZFL",
"54.36.110.194:19003:owenislaa:WnEJVYQZFL",
"54.36.110.194:19059:owenislaa:WnEJVYQZFL",
"54.36.110.194:15476:owenislaa:WnEJVYQZFL",
"54.36.110.194:18566:owenislaa:WnEJVYQZFL",
"54.36.110.194:13382:owenislaa:WnEJVYQZFL",
"54.36.110.194:19055:owenislaa:WnEJVYQZFL",
"54.36.110.194:12028:owenislaa:WnEJVYQZFL",
"54.36.110.194:18992:owenislaa:WnEJVYQZFL",
"54.36.110.194:18528:owenislaa:WnEJVYQZFL",
"54.36.110.194:18972:owenislaa:WnEJVYQZFL",
"54.36.110.194:18984:owenislaa:WnEJVYQZFL",
"54.36.110.194:19066:owenislaa:WnEJVYQZFL",
"54.36.110.194:14399:owenislaa:WnEJVYQZFL",
"54.36.110.194:14388:owenislaa:WnEJVYQZFL",
"54.36.110.194:18971:owenislaa:WnEJVYQZFL",
"54.36.110.194:19026:owenislaa:WnEJVYQZFL",
"54.36.110.194:13008:owenislaa:WnEJVYQZFL",
"54.36.110.194:19070:owenislaa:WnEJVYQZFL",
"54.36.110.194:19015:owenislaa:WnEJVYQZFL",
"54.36.110.194:19021:owenislaa:WnEJVYQZFL",
"54.36.110.194:15455:owenislaa:WnEJVYQZFL",
"54.36.110.194:19018:owenislaa:WnEJVYQZFL",
"54.36.110.194:19053:owenislaa:WnEJVYQZFL",
"54.36.110.194:15464:owenislaa:WnEJVYQZFL",
"54.36.110.194:15451:owenislaa:WnEJVYQZFL",
"54.36.110.194:12027:owenislaa:WnEJVYQZFL",
"54.36.110.194:13014:owenislaa:WnEJVYQZFL",
"54.36.110.194:10254:owenislaa:WnEJVYQZFL",
"54.36.110.194:18975:owenislaa:WnEJVYQZFL",
"54.36.110.194:18585:owenislaa:WnEJVYQZFL",
"54.36.110.194:19017:owenislaa:WnEJVYQZFL",
"54.36.110.194:10536:owenislaa:WnEJVYQZFL",
"54.36.110.194:12552:owenislaa:WnEJVYQZFL",
"54.36.110.194:18527:owenislaa:WnEJVYQZFL",
"54.36.110.194:15452:owenislaa:WnEJVYQZFL",
"54.36.110.194:18989:owenislaa:WnEJVYQZFL",
]
const proxies_2 = [
  "54.36.110.194:18970:owenislaa:WnEJVYQZFL",
"54.36.110.194:13262:owenislaa:WnEJVYQZFL",
"54.36.110.194:12930:owenislaa:WnEJVYQZFL",
"54.36.110.194:18994:owenislaa:WnEJVYQZFL",
"54.36.110.194:13299:owenislaa:WnEJVYQZFL",
"54.36.110.194:12995:owenislaa:WnEJVYQZFL",
"54.36.110.194:15461:owenislaa:WnEJVYQZFL",
"54.36.110.194:19020:owenislaa:WnEJVYQZFL",
"54.36.110.194:18993:owenislaa:WnEJVYQZFL",
"54.36.110.194:15460:owenislaa:WnEJVYQZFL",
"54.36.110.194:13179:owenislaa:WnEJVYQZFL",
"54.36.110.194:18579:owenislaa:WnEJVYQZFL",
"54.36.110.194:18522:owenislaa:WnEJVYQZFL",
"54.36.110.194:12550:owenislaa:WnEJVYQZFL",
"54.36.110.194:13375:owenislaa:WnEJVYQZFL",
"54.36.110.194:19014:owenislaa:WnEJVYQZFL",
"54.36.110.194:18571:owenislaa:WnEJVYQZFL",
"54.36.110.194:19012:owenislaa:WnEJVYQZFL",
"54.36.110.194:19027:owenislaa:WnEJVYQZFL",
"54.36.110.194:10534:owenislaa:WnEJVYQZFL",
"54.36.110.194:19008:owenislaa:WnEJVYQZFL",
"54.36.110.194:19049:owenislaa:WnEJVYQZFL",
"54.36.110.194:14391:owenislaa:WnEJVYQZFL",
"54.36.110.194:13010:owenislaa:WnEJVYQZFL",
"54.36.110.194:14397:owenislaa:WnEJVYQZFL",
"54.36.110.194:19036:owenislaa:WnEJVYQZFL",
"54.36.110.194:19009:owenislaa:WnEJVYQZFL",
"54.36.110.194:14398:owenislaa:WnEJVYQZFL",
"54.36.110.194:14396:owenislaa:WnEJVYQZFL",
"54.36.110.194:15456:owenislaa:WnEJVYQZFL",
"54.36.110.194:10245:owenislaa:WnEJVYQZFL",
"54.36.110.194:13306:owenislaa:WnEJVYQZFL",
"54.36.110.194:19071:owenislaa:WnEJVYQZFL",
"54.36.110.194:19013:owenislaa:WnEJVYQZFL",
"54.36.110.194:13373:owenislaa:WnEJVYQZFL",
"54.36.110.194:18583:owenislaa:WnEJVYQZFL",
"54.36.110.194:19045:owenislaa:WnEJVYQZFL",
"54.36.110.194:13177:owenislaa:WnEJVYQZFL",
"54.36.110.194:18568:owenislaa:WnEJVYQZFL",
"54.36.110.194:15467:owenislaa:WnEJVYQZFL",
"54.36.110.194:12548:owenislaa:WnEJVYQZFL",
"54.36.110.194:18983:owenislaa:WnEJVYQZFL",
"54.36.110.194:19073:owenislaa:WnEJVYQZFL",
"54.36.110.194:19006:owenislaa:WnEJVYQZFL",
"54.36.110.194:15465:owenislaa:WnEJVYQZFL",
"54.36.110.194:15466:owenislaa:WnEJVYQZFL",
"54.36.110.194:15457:owenislaa:WnEJVYQZFL",
"54.36.110.194:13376:owenislaa:WnEJVYQZFL",
"54.36.110.194:19000:owenislaa:WnEJVYQZFL",
"54.36.110.194:18562:owenislaa:WnEJVYQZFL",
"54.36.110.194:18569:owenislaa:WnEJVYQZFL",
"54.36.110.194:19030:owenislaa:WnEJVYQZFL",
"54.36.110.194:18998:owenislaa:WnEJVYQZFL",
"54.36.110.194:19065:owenislaa:WnEJVYQZFL",
"54.36.110.194:19068:owenislaa:WnEJVYQZFL",
"54.36.110.194:13257:owenislaa:WnEJVYQZFL",
"54.36.110.194:10542:owenislaa:WnEJVYQZFL",
"54.36.110.194:13381:owenislaa:WnEJVYQZFL",
"54.36.110.194:15472:owenislaa:WnEJVYQZFL",
"54.36.110.194:13005:owenislaa:WnEJVYQZFL",
"54.36.110.194:19037:owenislaa:WnEJVYQZFL",
"54.36.110.194:12994:owenislaa:WnEJVYQZFL",
"54.36.110.194:19042:owenislaa:WnEJVYQZFL",
"54.36.110.194:18575:owenislaa:WnEJVYQZFL",
"54.36.110.194:12475:owenislaa:WnEJVYQZFL",
"54.36.110.194:19035:owenislaa:WnEJVYQZFL",
"54.36.110.194:18973:owenislaa:WnEJVYQZFL",
"54.36.110.194:18581:owenislaa:WnEJVYQZFL",
"54.36.110.194:18521:owenislaa:WnEJVYQZFL",
"54.36.110.194:18995:owenislaa:WnEJVYQZFL",
"54.36.110.194:19011:owenislaa:WnEJVYQZFL",
"54.36.110.194:14389:owenislaa:WnEJVYQZFL",
"54.36.110.194:15454:owenislaa:WnEJVYQZFL",
"54.36.110.194:18977:owenislaa:WnEJVYQZFL",
"54.36.110.194:13304:owenislaa:WnEJVYQZFL",
"54.36.110.194:18572:owenislaa:WnEJVYQZFL",
"54.36.110.194:18577:owenislaa:WnEJVYQZFL",
"54.36.110.194:13294:owenislaa:WnEJVYQZFL",
"54.36.110.194:13374:owenislaa:WnEJVYQZFL",
"54.36.110.194:15474:owenislaa:WnEJVYQZFL",
"54.36.110.194:10250:owenislaa:WnEJVYQZFL",
"54.36.110.194:13015:owenislaa:WnEJVYQZFL",
"54.36.110.194:14385:owenislaa:WnEJVYQZFL",
"54.36.110.194:12022:owenislaa:WnEJVYQZFL",
"54.36.110.194:19004:owenislaa:WnEJVYQZFL",
"54.36.110.194:19022:owenislaa:WnEJVYQZFL",
"54.36.110.194:14384:owenislaa:WnEJVYQZFL",
"54.36.110.194:14400:owenislaa:WnEJVYQZFL",
"54.36.110.194:19052:owenislaa:WnEJVYQZFL",
"54.36.110.194:10541:owenislaa:WnEJVYQZFL",
"54.36.110.194:13002:owenislaa:WnEJVYQZFL",
"54.36.110.194:18582:owenislaa:WnEJVYQZFL",
"54.36.110.194:13378:owenislaa:WnEJVYQZFL",
"54.36.110.194:14386:owenislaa:WnEJVYQZFL",
"54.36.110.194:19050:owenislaa:WnEJVYQZFL",
"54.36.110.194:19039:owenislaa:WnEJVYQZFL",
"54.36.110.194:15475:owenislaa:WnEJVYQZFL",
"54.36.110.194:18991:owenislaa:WnEJVYQZFL",
"54.36.110.194:13256:owenislaa:WnEJVYQZFL",
"54.36.110.194:19005:owenislaa:WnEJVYQZFL",
"109.61.89.1:17607:owenislaa:WnEJVYQZFL",
"109.61.89.1:13022:owenislaa:WnEJVYQZFL",
"109.61.89.1:10101:owenislaa:WnEJVYQZFL",
"109.61.89.1:12080:owenislaa:WnEJVYQZFL",
"109.61.89.1:11833:owenislaa:WnEJVYQZFL",
"109.61.89.1:18251:owenislaa:WnEJVYQZFL",
"109.61.89.1:11860:owenislaa:WnEJVYQZFL",
"109.61.89.1:12856:owenislaa:WnEJVYQZFL",
"109.61.89.1:12872:owenislaa:WnEJVYQZFL",
"109.61.89.1:12852:owenislaa:WnEJVYQZFL",
"109.61.89.1:12803:owenislaa:WnEJVYQZFL",
"109.61.89.1:12225:owenislaa:WnEJVYQZFL",
"109.61.89.1:17595:owenislaa:WnEJVYQZFL",
"109.61.89.1:13178:owenislaa:WnEJVYQZFL",
"109.61.89.1:11905:owenislaa:WnEJVYQZFL",
"109.61.89.1:12258:owenislaa:WnEJVYQZFL",
"109.61.89.1:11835:owenislaa:WnEJVYQZFL",
"109.61.89.1:17542:owenislaa:WnEJVYQZFL",
"109.61.89.1:13188:owenislaa:WnEJVYQZFL",
"109.61.89.1:17608:owenislaa:WnEJVYQZFL",
"109.61.89.1:11921:owenislaa:WnEJVYQZFL",
"109.61.89.1:12595:owenislaa:WnEJVYQZFL",
"109.61.89.1:13148:owenislaa:WnEJVYQZFL",
"109.61.89.1:17567:owenislaa:WnEJVYQZFL",
"109.61.89.1:12297:owenislaa:WnEJVYQZFL",
"109.61.89.1:12854:owenislaa:WnEJVYQZFL",
"109.61.89.1:12888:owenislaa:WnEJVYQZFL",
"109.61.89.1:18241:owenislaa:WnEJVYQZFL",
"109.61.89.1:12023:owenislaa:WnEJVYQZFL",
"109.61.89.1:11890:owenislaa:WnEJVYQZFL",
"109.61.89.1:12597:owenislaa:WnEJVYQZFL",
"109.61.89.1:13014:owenislaa:WnEJVYQZFL",
"109.61.89.1:12209:owenislaa:WnEJVYQZFL",
"109.61.89.1:12151:owenislaa:WnEJVYQZFL",
"109.61.89.1:17568:owenislaa:WnEJVYQZFL",
"109.61.89.1:11826:owenislaa:WnEJVYQZFL",
"109.61.89.1:12260:owenislaa:WnEJVYQZFL",
"109.61.89.1:10103:owenislaa:WnEJVYQZFL",
"109.61.89.1:12696:owenislaa:WnEJVYQZFL",
"109.61.89.1:17581:owenislaa:WnEJVYQZFL",
"109.61.89.1:11912:owenislaa:WnEJVYQZFL",
"109.61.89.1:17561:owenislaa:WnEJVYQZFL",
"109.61.89.1:11832:owenislaa:WnEJVYQZFL",
"109.61.89.1:12173:owenislaa:WnEJVYQZFL",
"109.61.89.1:12019:owenislaa:WnEJVYQZFL",
"109.61.89.1:12890:owenislaa:WnEJVYQZFL",
"109.61.89.1:12313:owenislaa:WnEJVYQZFL",
"109.61.89.1:12600:owenislaa:WnEJVYQZFL",
"109.61.89.1:11907:owenislaa:WnEJVYQZFL",
"109.61.89.1:11903:owenislaa:WnEJVYQZFL",
"109.61.89.1:12261:owenislaa:WnEJVYQZFL",
"109.61.89.1:11880:owenislaa:WnEJVYQZFL",
"109.61.89.1:12268:owenislaa:WnEJVYQZFL",
"109.61.89.1:11951:owenislaa:WnEJVYQZFL",
"109.61.89.1:13181:owenislaa:WnEJVYQZFL",
"109.61.89.1:11944:owenislaa:WnEJVYQZFL",
"109.61.89.1:11838:owenislaa:WnEJVYQZFL",
"109.61.89.1:11897:owenislaa:WnEJVYQZFL",
"109.61.89.1:11827:owenislaa:WnEJVYQZFL",
"109.61.89.1:13241:owenislaa:WnEJVYQZFL",
"109.61.89.1:11882:owenislaa:WnEJVYQZFL",
"109.61.89.1:18254:owenislaa:WnEJVYQZFL",
"109.61.89.1:14830:owenislaa:WnEJVYQZFL",
"109.61.89.1:17563:owenislaa:WnEJVYQZFL",
"109.61.89.1:12004:owenislaa:WnEJVYQZFL",
"109.61.89.1:17602:owenislaa:WnEJVYQZFL",
"109.61.89.1:12293:owenislaa:WnEJVYQZFL",
"109.61.89.1:13018:owenislaa:WnEJVYQZFL",
"109.61.89.1:18252:owenislaa:WnEJVYQZFL",
"109.61.89.1:12213:owenislaa:WnEJVYQZFL",
"109.61.89.1:18263:owenislaa:WnEJVYQZFL",
"109.61.89.1:13150:owenislaa:WnEJVYQZFL",
"109.61.89.1:11828:owenislaa:WnEJVYQZFL",
"109.61.89.1:12857:owenislaa:WnEJVYQZFL",
"109.61.89.1:17531:owenislaa:WnEJVYQZFL",
"109.61.89.1:18247:owenislaa:WnEJVYQZFL",
"109.61.89.1:14837:owenislaa:WnEJVYQZFL",
"109.61.89.1:10090:owenislaa:WnEJVYQZFL",
"109.61.89.1:11841:owenislaa:WnEJVYQZFL",
"109.61.89.1:12050:owenislaa:WnEJVYQZFL",
"109.61.89.1:13239:owenislaa:WnEJVYQZFL",
"109.61.89.1:12296:owenislaa:WnEJVYQZFL",
"109.61.89.1:12553:owenislaa:WnEJVYQZFL",
"109.61.89.1:13098:owenislaa:WnEJVYQZFL",
"109.61.89.1:12016:owenislaa:WnEJVYQZFL",
"109.61.89.1:17528:owenislaa:WnEJVYQZFL",
"109.61.89.1:12043:owenislaa:WnEJVYQZFL",
"109.61.89.1:12874:owenislaa:WnEJVYQZFL",
"109.61.89.1:12891:owenislaa:WnEJVYQZFL",
"109.61.89.1:11895:owenislaa:WnEJVYQZFL",
"109.61.89.1:12207:owenislaa:WnEJVYQZFL",
"109.61.89.1:12294:owenislaa:WnEJVYQZFL",
"109.61.89.1:12599:owenislaa:WnEJVYQZFL",
"109.61.89.1:12871:owenislaa:WnEJVYQZFL",
"109.61.89.1:17543:owenislaa:WnEJVYQZFL",
"109.61.89.1:12298:owenislaa:WnEJVYQZFL",
"109.61.89.1:13154:owenislaa:WnEJVYQZFL",
"109.61.89.1:11961:owenislaa:WnEJVYQZFL",
"109.61.89.1:12215:owenislaa:WnEJVYQZFL",
"109.61.89.1:17590:owenislaa:WnEJVYQZFL",
"109.61.89.1:10102:owenislaa:WnEJVYQZFL",
"109.61.89.1:11929:owenislaa:WnEJVYQZFL",
"109.61.89.1:12612:owenislaa:WnEJVYQZFL",
"109.61.89.1:17612:owenislaa:WnEJVYQZFL",
"109.61.89.1:12227:owenislaa:WnEJVYQZFL",
"109.61.89.1:12051:owenislaa:WnEJVYQZFL",
"109.61.89.1:17536:owenislaa:WnEJVYQZFL",
"109.61.89.1:13156:owenislaa:WnEJVYQZFL",
"109.61.89.1:11955:owenislaa:WnEJVYQZFL",
"109.61.89.1:11887:owenislaa:WnEJVYQZFL",
"109.61.89.1:17539:owenislaa:WnEJVYQZFL",
"109.61.89.1:11861:owenislaa:WnEJVYQZFL",
"109.61.89.1:11949:owenislaa:WnEJVYQZFL",
"109.61.89.1:13099:owenislaa:WnEJVYQZFL",
"109.61.89.1:12621:owenislaa:WnEJVYQZFL",
"109.61.89.1:11892:owenislaa:WnEJVYQZFL",
"109.61.89.1:12206:owenislaa:WnEJVYQZFL",
"109.61.89.1:12624:owenislaa:WnEJVYQZFL",
"109.61.89.1:17562:owenislaa:WnEJVYQZFL",
"109.61.89.1:11839:owenislaa:WnEJVYQZFL",
"109.61.89.1:17565:owenislaa:WnEJVYQZFL",
"109.61.89.1:12548:owenislaa:WnEJVYQZFL",
"109.61.89.1:12022:owenislaa:WnEJVYQZFL",
"109.61.89.1:17533:owenislaa:WnEJVYQZFL",
"109.61.89.1:12292:owenislaa:WnEJVYQZFL",
"109.61.89.1:12598:owenislaa:WnEJVYQZFL",
"109.61.89.1:12210:owenislaa:WnEJVYQZFL",
"109.61.89.1:13103:owenislaa:WnEJVYQZFL",
"109.61.89.1:18258:owenislaa:WnEJVYQZFL",
"109.61.89.1:12055:owenislaa:WnEJVYQZFL",
"109.61.89.1:12079:owenislaa:WnEJVYQZFL",
"109.61.89.1:12399:owenislaa:WnEJVYQZFL",
"109.61.89.1:18246:owenislaa:WnEJVYQZFL",
"109.61.89.1:13243:owenislaa:WnEJVYQZFL",
"109.61.89.1:13097:owenislaa:WnEJVYQZFL",
"109.61.89.1:12601:owenislaa:WnEJVYQZFL",
"109.61.89.1:13146:owenislaa:WnEJVYQZFL",
"109.61.89.1:18260:owenislaa:WnEJVYQZFL",
"109.61.89.1:10094:owenislaa:WnEJVYQZFL",
"109.61.89.1:11918:owenislaa:WnEJVYQZFL",
"109.61.89.1:17609:owenislaa:WnEJVYQZFL",
"109.61.89.1:11862:owenislaa:WnEJVYQZFL",
"109.61.89.1:12211:owenislaa:WnEJVYQZFL",
"109.61.89.1:17584:owenislaa:WnEJVYQZFL",
"109.61.89.1:17613:owenislaa:WnEJVYQZFL",
"109.61.89.1:12160:owenislaa:WnEJVYQZFL",
"109.61.89.1:11946:owenislaa:WnEJVYQZFL",
"109.61.89.1:12033:owenislaa:WnEJVYQZFL",
"109.61.89.1:13033:owenislaa:WnEJVYQZFL",
"109.61.89.1:11924:owenislaa:WnEJVYQZFL",
"109.61.89.1:11884:owenislaa:WnEJVYQZFL",
"109.61.89.1:12156:owenislaa:WnEJVYQZFL",
"109.61.89.1:12760:owenislaa:WnEJVYQZFL",
"109.61.89.1:12201:owenislaa:WnEJVYQZFL",
"109.61.89.1:17606:owenislaa:WnEJVYQZFL",
"109.61.89.1:17604:owenislaa:WnEJVYQZFL",
"109.61.89.1:11948:owenislaa:WnEJVYQZFL",
"109.61.89.1:13190:owenislaa:WnEJVYQZFL",
"109.61.89.1:13177:owenislaa:WnEJVYQZFL",
"109.61.89.1:17594:owenislaa:WnEJVYQZFL",
"109.61.89.1:11830:owenislaa:WnEJVYQZFL",
"109.61.89.1:12224:owenislaa:WnEJVYQZFL",
"109.61.89.1:17537:owenislaa:WnEJVYQZFL",
"109.61.89.1:12873:owenislaa:WnEJVYQZFL",
"109.61.89.1:14829:owenislaa:WnEJVYQZFL",
"109.61.89.1:12040:owenislaa:WnEJVYQZFL",
"109.61.89.1:12825:owenislaa:WnEJVYQZFL",
"109.61.89.1:17582:owenislaa:WnEJVYQZFL",
"109.61.89.1:11819:owenislaa:WnEJVYQZFL",
"109.61.89.1:17530:owenislaa:WnEJVYQZFL",
"109.61.89.1:17587:owenislaa:WnEJVYQZFL",
"109.61.89.1:11945:owenislaa:WnEJVYQZFL",
"109.61.89.1:17599:owenislaa:WnEJVYQZFL",
"109.61.89.1:17558:owenislaa:WnEJVYQZFL",
"109.61.89.1:11813:owenislaa:WnEJVYQZFL",
"109.61.89.1:10091:owenislaa:WnEJVYQZFL",
"109.61.89.1:17593:owenislaa:WnEJVYQZFL",
"109.61.89.1:11840:owenislaa:WnEJVYQZFL",
"109.61.89.1:13034:owenislaa:WnEJVYQZFL",
"109.61.89.1:11889:owenislaa:WnEJVYQZFL",
"109.61.89.1:18256:owenislaa:WnEJVYQZFL",
"109.61.89.1:11824:owenislaa:WnEJVYQZFL",
"109.61.89.1:11834:owenislaa:WnEJVYQZFL",
"109.61.89.1:11957:owenislaa:WnEJVYQZFL",
"109.61.89.1:13179:owenislaa:WnEJVYQZFL",
"109.61.89.1:12249:owenislaa:WnEJVYQZFL",
"109.61.89.1:11886:owenislaa:WnEJVYQZFL",
"109.61.89.1:12002:owenislaa:WnEJVYQZFL",
"109.61.89.1:10089:owenislaa:WnEJVYQZFL",
"109.61.89.1:13101:owenislaa:WnEJVYQZFL",
"109.61.89.1:12267:owenislaa:WnEJVYQZFL",
"109.61.89.1:12076:owenislaa:WnEJVYQZFL",
"109.61.89.1:13021:owenislaa:WnEJVYQZFL",
"109.61.89.1:13183:owenislaa:WnEJVYQZFL",
"109.61.89.1:10093:owenislaa:WnEJVYQZFL",
"109.61.89.1:11915:owenislaa:WnEJVYQZFL",
"109.61.89.1:12045:owenislaa:WnEJVYQZFL",
"109.61.89.1:17585:owenislaa:WnEJVYQZFL",
"109.61.89.1:12057:owenislaa:WnEJVYQZFL",
"109.61.89.1:12158:owenislaa:WnEJVYQZFL",
"109.61.89.1:11906:owenislaa:WnEJVYQZFL",
"109.61.89.1:17601:owenislaa:WnEJVYQZFL",
]
const proxies_3 = [
"109.61.89.1:18243:owenislaa:WnEJVYQZFL",
"109.61.89.1:11818:owenislaa:WnEJVYQZFL",
"109.61.89.1:12041:owenislaa:WnEJVYQZFL",
"109.61.89.1:13037:owenislaa:WnEJVYQZFL",
"109.61.89.1:13245:owenislaa:WnEJVYQZFL",
"109.61.89.1:11816:owenislaa:WnEJVYQZFL",
"109.61.89.1:18255:owenislaa:WnEJVYQZFL",
"109.61.89.1:13172:owenislaa:WnEJVYQZFL",
"109.61.89.1:12020:owenislaa:WnEJVYQZFL",
"109.61.89.1:11934:owenislaa:WnEJVYQZFL",
"109.61.89.1:13136:owenislaa:WnEJVYQZFL",
"109.61.89.1:11938:owenislaa:WnEJVYQZFL",
"109.61.89.1:12058:owenislaa:WnEJVYQZFL",
"109.61.89.1:12309:owenislaa:WnEJVYQZFL",
"109.61.89.1:12855:owenislaa:WnEJVYQZFL",
"109.61.89.1:17588:owenislaa:WnEJVYQZFL",
"109.61.89.1:13100:owenislaa:WnEJVYQZFL",
"109.61.89.1:11883:owenislaa:WnEJVYQZFL",
"109.61.89.1:13246:owenislaa:WnEJVYQZFL",
"109.61.89.1:12334:owenislaa:WnEJVYQZFL",
"109.61.89.1:13095:owenislaa:WnEJVYQZFL",
"109.61.89.1:13137:owenislaa:WnEJVYQZFL",
"109.61.89.1:12056:owenislaa:WnEJVYQZFL",
"109.61.89.1:12880:owenislaa:WnEJVYQZFL",
"109.61.89.1:11817:owenislaa:WnEJVYQZFL",
"109.61.89.1:12266:owenislaa:WnEJVYQZFL",
"109.61.89.1:12039:owenislaa:WnEJVYQZFL",
"109.61.89.1:12072:owenislaa:WnEJVYQZFL",
"109.61.89.1:12543:owenislaa:WnEJVYQZFL",
"109.61.89.1:11963:owenislaa:WnEJVYQZFL",
"109.61.89.1:12048:owenislaa:WnEJVYQZFL",
"109.61.89.1:13017:owenislaa:WnEJVYQZFL",
"109.61.89.1:10105:owenislaa:WnEJVYQZFL",
"109.61.89.1:17541:owenislaa:WnEJVYQZFL",
"109.61.89.1:13035:owenislaa:WnEJVYQZFL",
"109.61.89.1:17569:owenislaa:WnEJVYQZFL",
"109.61.89.1:12073:owenislaa:WnEJVYQZFL",
"109.61.89.1:13153:owenislaa:WnEJVYQZFL",
"109.61.89.1:12054:owenislaa:WnEJVYQZFL",
"109.61.89.1:12074:owenislaa:WnEJVYQZFL",
"109.61.89.1:12317:owenislaa:WnEJVYQZFL",
"109.61.89.1:12003:owenislaa:WnEJVYQZFL",
"109.61.89.1:11898:owenislaa:WnEJVYQZFL",
"109.61.89.1:13012:owenislaa:WnEJVYQZFL",
"109.61.89.1:18242:owenislaa:WnEJVYQZFL",
"109.61.89.1:12546:owenislaa:WnEJVYQZFL",
"109.61.89.1:12853:owenislaa:WnEJVYQZFL",
"109.61.89.1:18253:owenislaa:WnEJVYQZFL",
"109.61.89.1:11910:owenislaa:WnEJVYQZFL",
"109.61.89.1:12892:owenislaa:WnEJVYQZFL",
"109.61.89.1:12802:owenislaa:WnEJVYQZFL",
"109.61.89.1:12199:owenislaa:WnEJVYQZFL",
"109.61.89.1:13240:owenislaa:WnEJVYQZFL",
"109.61.89.1:11956:owenislaa:WnEJVYQZFL",
"109.61.89.1:18238:owenislaa:WnEJVYQZFL",
"109.61.89.1:12047:owenislaa:WnEJVYQZFL",
"109.61.89.1:13157:owenislaa:WnEJVYQZFL",
"109.61.89.1:12198:owenislaa:WnEJVYQZFL",
"109.61.89.1:18259:owenislaa:WnEJVYQZFL",
"109.61.89.1:13015:owenislaa:WnEJVYQZFL",
"109.61.89.1:13019:owenislaa:WnEJVYQZFL",
"109.61.89.1:10092:owenislaa:WnEJVYQZFL",
"109.61.89.1:12052:owenislaa:WnEJVYQZFL",
"109.61.89.1:13160:owenislaa:WnEJVYQZFL",
"109.61.89.1:12337:owenislaa:WnEJVYQZFL",
"109.61.89.1:17610:owenislaa:WnEJVYQZFL",
"109.61.89.1:13152:owenislaa:WnEJVYQZFL",
"109.61.89.1:13171:owenislaa:WnEJVYQZFL",
"109.61.89.1:12046:owenislaa:WnEJVYQZFL",
"109.61.89.1:12015:owenislaa:WnEJVYQZFL",
"109.61.89.1:13102:owenislaa:WnEJVYQZFL",
"109.61.89.1:14835:owenislaa:WnEJVYQZFL",
"109.61.89.1:11920:owenislaa:WnEJVYQZFL",
"109.61.89.1:13180:owenislaa:WnEJVYQZFL",
"109.61.89.1:13149:owenislaa:WnEJVYQZFL",
"109.61.89.1:12877:owenislaa:WnEJVYQZFL",
"109.61.89.1:18264:owenislaa:WnEJVYQZFL",
"109.61.89.1:12226:owenislaa:WnEJVYQZFL",
"109.61.89.1:13185:owenislaa:WnEJVYQZFL",
"109.61.89.1:12550:owenislaa:WnEJVYQZFL",
"109.61.89.1:12017:owenislaa:WnEJVYQZFL",
"109.61.89.1:12870:owenislaa:WnEJVYQZFL",
"109.61.89.1:12291:owenislaa:WnEJVYQZFL",
"109.61.89.1:11922:owenislaa:WnEJVYQZFL",
"109.61.89.1:14831:owenislaa:WnEJVYQZFL",
"109.61.89.1:12194:owenislaa:WnEJVYQZFL",
"109.61.89.1:12001:owenislaa:WnEJVYQZFL",
"109.61.89.1:13036:owenislaa:WnEJVYQZFL",
"109.61.89.1:11885:owenislaa:WnEJVYQZFL",
"109.61.89.1:11909:owenislaa:WnEJVYQZFL",
"109.61.89.1:11933:owenislaa:WnEJVYQZFL",
"109.61.89.1:12596:owenislaa:WnEJVYQZFL",
"109.61.89.1:12200:owenislaa:WnEJVYQZFL",
"109.61.89.1:12155:owenislaa:WnEJVYQZFL",
"109.61.89.1:12177:owenislaa:WnEJVYQZFL",
"109.61.89.1:17564:owenislaa:WnEJVYQZFL",
"109.61.89.1:11900:owenislaa:WnEJVYQZFL",
"109.61.89.1:17591:owenislaa:WnEJVYQZFL",
"109.61.89.1:13184:owenislaa:WnEJVYQZFL",
"109.61.89.1:12400:owenislaa:WnEJVYQZFL",
"109.61.89.1:11917:owenislaa:WnEJVYQZFL",
"109.61.89.1:12295:owenislaa:WnEJVYQZFL",
"109.61.89.1:11893:owenislaa:WnEJVYQZFL",
"109.61.89.1:12290:owenislaa:WnEJVYQZFL",
"109.61.89.1:12879:owenislaa:WnEJVYQZFL",
"109.61.89.1:17545:owenislaa:WnEJVYQZFL",
"109.61.89.1:11857:owenislaa:WnEJVYQZFL",
"109.61.89.1:11863:owenislaa:WnEJVYQZFL",
"109.61.89.1:17605:owenislaa:WnEJVYQZFL",
"109.61.89.1:18236:owenislaa:WnEJVYQZFL",
"109.61.89.1:17535:owenislaa:WnEJVYQZFL",
"109.61.89.1:12625:owenislaa:WnEJVYQZFL",
"109.61.89.1:14828:owenislaa:WnEJVYQZFL",
"109.61.89.1:18262:owenislaa:WnEJVYQZFL",
"109.61.89.1:14833:owenislaa:WnEJVYQZFL",
"109.61.89.1:12875:owenislaa:WnEJVYQZFL",
"109.61.89.1:12544:owenislaa:WnEJVYQZFL",
"109.61.89.1:13159:owenislaa:WnEJVYQZFL",
"109.61.89.1:12889:owenislaa:WnEJVYQZFL",
"109.61.89.1:12153:owenislaa:WnEJVYQZFL",
"109.61.89.1:12318:owenislaa:WnEJVYQZFL",
"109.61.89.1:17538:owenislaa:WnEJVYQZFL",
"109.61.89.1:17603:owenislaa:WnEJVYQZFL",
"109.61.89.1:11927:owenislaa:WnEJVYQZFL",
"109.61.89.1:12178:owenislaa:WnEJVYQZFL",
"109.61.89.1:12075:owenislaa:WnEJVYQZFL",
"109.61.89.1:12549:owenislaa:WnEJVYQZFL",
"109.61.89.1:17534:owenislaa:WnEJVYQZFL",
"109.61.89.1:13175:owenislaa:WnEJVYQZFL",
"109.61.89.1:11916:owenislaa:WnEJVYQZFL",
"109.61.89.1:11901:owenislaa:WnEJVYQZFL",
"109.61.89.1:12878:owenislaa:WnEJVYQZFL",
"109.61.89.1:17544:owenislaa:WnEJVYQZFL",
"109.61.89.1:11914:owenislaa:WnEJVYQZFL",
"109.61.89.1:17532:owenislaa:WnEJVYQZFL",
"109.61.89.1:12333:owenislaa:WnEJVYQZFL",
"109.61.89.1:13151:owenislaa:WnEJVYQZFL",
"109.61.89.1:17617:owenislaa:WnEJVYQZFL",
"109.61.89.1:11881:owenislaa:WnEJVYQZFL",
"109.61.89.1:12699:owenislaa:WnEJVYQZFL",
"109.61.89.1:12228:owenislaa:WnEJVYQZFL",
"109.61.89.1:12884:owenislaa:WnEJVYQZFL",
"109.61.89.1:11888:owenislaa:WnEJVYQZFL",
"109.61.89.1:12053:owenislaa:WnEJVYQZFL",
"109.61.89.1:18248:owenislaa:WnEJVYQZFL",
"109.61.89.1:11825:owenislaa:WnEJVYQZFL",
"109.61.89.1:12214:owenislaa:WnEJVYQZFL",
"109.61.89.1:12312:owenislaa:WnEJVYQZFL",
"109.61.89.1:11911:owenislaa:WnEJVYQZFL",
"109.61.89.1:11928:owenislaa:WnEJVYQZFL",
"109.61.89.1:11814:owenislaa:WnEJVYQZFL",
"109.61.89.1:13158:owenislaa:WnEJVYQZFL",
"109.61.89.1:11999:owenislaa:WnEJVYQZFL",
"109.61.89.1:11902:owenislaa:WnEJVYQZFL",
"109.61.89.1:12893:owenislaa:WnEJVYQZFL",
"109.61.89.1:13147:owenislaa:WnEJVYQZFL",
"109.61.89.1:13173:owenislaa:WnEJVYQZFL",
"109.61.89.1:17598:owenislaa:WnEJVYQZFL",
"109.61.89.1:11831:owenislaa:WnEJVYQZFL",
"109.61.89.1:12332:owenislaa:WnEJVYQZFL",
"109.61.89.1:13023:owenislaa:WnEJVYQZFL",
"109.61.89.1:11950:owenislaa:WnEJVYQZFL",
"109.61.89.1:12161:owenislaa:WnEJVYQZFL",
"109.61.89.1:11919:owenislaa:WnEJVYQZFL",
"109.61.89.1:12029:owenislaa:WnEJVYQZFL",
"109.61.89.1:11925:owenislaa:WnEJVYQZFL",
"109.61.89.1:12044:owenislaa:WnEJVYQZFL",
"109.61.89.1:12869:owenislaa:WnEJVYQZFL",
"109.61.89.1:17559:owenislaa:WnEJVYQZFL",
"109.61.89.1:17586:owenislaa:WnEJVYQZFL",
"109.61.89.1:18257:owenislaa:WnEJVYQZFL",
"109.61.89.1:11859:owenislaa:WnEJVYQZFL",
"109.61.89.1:12000:owenislaa:WnEJVYQZFL",
"109.61.89.1:12311:owenislaa:WnEJVYQZFL",
"109.61.89.1:12315:owenislaa:WnEJVYQZFL",
"109.61.89.1:12246:owenislaa:WnEJVYQZFL",
"109.61.89.1:12602:owenislaa:WnEJVYQZFL",
"109.61.89.1:12336:owenislaa:WnEJVYQZFL",
"109.61.89.1:11894:owenislaa:WnEJVYQZFL",
"109.61.89.1:18240:owenislaa:WnEJVYQZFL",
"109.61.89.1:11958:owenislaa:WnEJVYQZFL",
"109.61.89.1:12858:owenislaa:WnEJVYQZFL",
"109.61.89.1:11923:owenislaa:WnEJVYQZFL",
"109.61.89.1:11947:owenislaa:WnEJVYQZFL",
"109.61.89.1:11932:owenislaa:WnEJVYQZFL",
"109.61.89.1:12152:owenislaa:WnEJVYQZFL",
"109.61.89.1:12196:owenislaa:WnEJVYQZFL",
"109.61.89.1:14834:owenislaa:WnEJVYQZFL",
"109.61.89.1:11997:owenislaa:WnEJVYQZFL",
"109.61.89.1:11998:owenislaa:WnEJVYQZFL",
"109.61.89.1:11960:owenislaa:WnEJVYQZFL",
"109.61.89.1:12244:owenislaa:WnEJVYQZFL",
"109.61.89.1:12547:owenislaa:WnEJVYQZFL",
"109.61.89.1:12081:owenislaa:WnEJVYQZFL",
"109.61.89.1:11959:owenislaa:WnEJVYQZFL",
"109.61.89.1:13174:owenislaa:WnEJVYQZFL",
"109.61.89.1:11908:owenislaa:WnEJVYQZFL",
"109.61.89.1:17611:owenislaa:WnEJVYQZFL",
"109.61.89.1:12545:owenislaa:WnEJVYQZFL",
"109.61.89.1:12212:owenislaa:WnEJVYQZFL",
"109.61.89.1:14832:owenislaa:WnEJVYQZFL",
"109.61.89.1:11821:owenislaa:WnEJVYQZFL",
"109.61.89.1:12223:owenislaa:WnEJVYQZFL",
"109.61.89.1:12222:owenislaa:WnEJVYQZFL",
"109.61.89.1:12876:owenislaa:WnEJVYQZFL",
"109.61.89.1:11896:owenislaa:WnEJVYQZFL",
"109.61.89.1:11904:owenislaa:WnEJVYQZFL",
"109.61.89.1:11815:owenislaa:WnEJVYQZFL",
"109.61.89.1:12698:owenislaa:WnEJVYQZFL",
"109.61.89.1:18239:owenislaa:WnEJVYQZFL",
"109.61.89.1:18245:owenislaa:WnEJVYQZFL",
"109.61.89.1:17540:owenislaa:WnEJVYQZFL",
"109.61.89.1:11820:owenislaa:WnEJVYQZFL",
"109.61.89.1:12229:owenislaa:WnEJVYQZFL",
"109.61.89.1:11829:owenislaa:WnEJVYQZFL",
"109.61.89.1:12868:owenislaa:WnEJVYQZFL",
"109.61.89.1:18249:owenislaa:WnEJVYQZFL",
"109.61.89.1:12335:owenislaa:WnEJVYQZFL",
"109.61.89.1:14836:owenislaa:WnEJVYQZFL",
"109.61.89.1:12197:owenislaa:WnEJVYQZFL",
"109.61.89.1:12259:owenislaa:WnEJVYQZFL",
"109.61.89.1:11899:owenislaa:WnEJVYQZFL",
"109.61.89.1:13182:owenislaa:WnEJVYQZFL",
"109.61.89.1:12245:owenislaa:WnEJVYQZFL",
"109.61.89.1:12622:owenislaa:WnEJVYQZFL",
"109.61.89.1:13105:owenislaa:WnEJVYQZFL",
"109.61.89.1:12034:owenislaa:WnEJVYQZFL",
"109.61.89.1:13186:owenislaa:WnEJVYQZFL",
"109.61.89.1:13244:owenislaa:WnEJVYQZFL",
"109.61.89.1:17560:owenislaa:WnEJVYQZFL",
"109.61.89.1:11866:owenislaa:WnEJVYQZFL",
"109.61.89.1:13242:owenislaa:WnEJVYQZFL",
"109.61.89.1:12154:owenislaa:WnEJVYQZFL",
"109.61.89.1:13247:owenislaa:WnEJVYQZFL",
"109.61.89.1:11858:owenislaa:WnEJVYQZFL",
"109.61.89.1:13187:owenislaa:WnEJVYQZFL",
"109.61.89.1:17614:owenislaa:WnEJVYQZFL",
"109.61.89.1:17583:owenislaa:WnEJVYQZFL",
"109.61.89.1:11926:owenislaa:WnEJVYQZFL",
"109.61.89.1:11954:owenislaa:WnEJVYQZFL",
"109.61.89.1:12623:owenislaa:WnEJVYQZFL",
"109.61.89.1:18261:owenislaa:WnEJVYQZFL",
"109.61.89.1:12310:owenislaa:WnEJVYQZFL",
"109.61.89.1:11931:owenislaa:WnEJVYQZFL",
"109.61.89.1:13096:owenislaa:WnEJVYQZFL",
"109.61.89.1:13248:owenislaa:WnEJVYQZFL",
"109.61.89.1:17615:owenislaa:WnEJVYQZFL",
"109.61.89.1:11996:owenislaa:WnEJVYQZFL",
"109.61.89.1:18250:owenislaa:WnEJVYQZFL",
"109.61.89.1:11891:owenislaa:WnEJVYQZFL",
"109.61.89.1:13068:owenislaa:WnEJVYQZFL",
"109.61.89.1:18244:owenislaa:WnEJVYQZFL",
"109.61.89.1:13016:owenislaa:WnEJVYQZFL",
"109.61.89.1:12247:owenislaa:WnEJVYQZFL",
"109.61.89.1:17529:owenislaa:WnEJVYQZFL",
"109.61.89.1:17566:owenislaa:WnEJVYQZFL",
"109.61.89.1:12883:owenislaa:WnEJVYQZFL",
"109.61.89.1:11837:owenislaa:WnEJVYQZFL",
"109.61.89.1:11877:owenislaa:WnEJVYQZFL",
"109.61.89.1:11878:owenislaa:WnEJVYQZFL",
"109.61.89.1:17597:owenislaa:WnEJVYQZFL",
"109.61.89.1:11930:owenislaa:WnEJVYQZFL",
"109.61.89.1:13104:owenislaa:WnEJVYQZFL",
"109.61.89.1:17589:owenislaa:WnEJVYQZFL",
"109.61.89.1:13145:owenislaa:WnEJVYQZFL",
"109.61.89.1:12316:owenislaa:WnEJVYQZFL",
"109.61.89.1:12021:owenislaa:WnEJVYQZFL",
"109.61.89.1:12314:owenislaa:WnEJVYQZFL",
"109.61.89.1:17596:owenislaa:WnEJVYQZFL",
"109.61.89.1:17600:owenislaa:WnEJVYQZFL",
"109.61.89.1:17570:owenislaa:WnEJVYQZFL",
"109.61.89.1:17546:owenislaa:WnEJVYQZFL",
"109.61.89.1:12159:owenislaa:WnEJVYQZFL",
"109.61.89.1:17547:owenislaa:WnEJVYQZFL",
"109.61.89.1:13020:owenislaa:WnEJVYQZFL",
"109.61.89.1:11836:owenislaa:WnEJVYQZFL",
"109.61.89.1:12049:owenislaa:WnEJVYQZFL",
"109.61.89.1:12172:owenislaa:WnEJVYQZFL",
"109.61.89.1:12759:owenislaa:WnEJVYQZFL",
"109.61.89.1:17592:owenislaa:WnEJVYQZFL",
"109.61.89.1:11879:owenislaa:WnEJVYQZFL",
"109.61.89.1:12195:owenislaa:WnEJVYQZFL",
"109.61.89.1:12243:owenislaa:WnEJVYQZFL",
"109.61.89.1:12248:owenislaa:WnEJVYQZFL",
"109.61.89.1:17616:owenislaa:WnEJVYQZFL",
"109.61.89.1:11953:owenislaa:WnEJVYQZFL",
"109.61.89.1:11952:owenislaa:WnEJVYQZFL",
"109.61.89.1:13189:owenislaa:WnEJVYQZFL",
"109.61.89.1:18235:owenislaa:WnEJVYQZFL",
"109.61.89.1:11864:owenislaa:WnEJVYQZFL",
"109.61.89.1:12866:owenislaa:WnEJVYQZFL",
"109.61.89.1:12018:owenislaa:WnEJVYQZFL",
"109.61.89.1:12697:owenislaa:WnEJVYQZFL",
"109.61.89.1:11913:owenislaa:WnEJVYQZFL",
"109.61.89.1:11865:owenislaa:WnEJVYQZFL",
"109.61.89.1:13155:owenislaa:WnEJVYQZFL",
"109.61.89.1:13176:owenislaa:WnEJVYQZFL",
"109.61.89.1:18237:owenislaa:WnEJVYQZFL",
];

let index = 0;
const proxies = parseInt(process.env.INDEX as string) === 0 ? proxies_1 : parseInt(process.env.INDEX as string) === 1 ? proxies_2 : proxies_3;
// const proxies = [...proxies_1,...proxies_2];
export function getNextProxy(): string {
  const proxy = proxies[index];
  index = (index + 1) % proxies.length;
  return proxy;
}
