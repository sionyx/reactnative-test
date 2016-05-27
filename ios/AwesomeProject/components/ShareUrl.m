//
//  ShareUrl.m
//  AwesomeProject
//
//  Created by Вадим Балашов on 16.05.16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ShareUrl.h"
#import "RCTConvert.h"


@implementation ShareUrl

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(shareUrl:(NSString *)url details:(NSDictionary *)details) {
  NSMutableArray *sharingItems = @[].mutableCopy;
  [sharingItems addObject:url];

  NSString *title = [RCTConvert NSString:details[@"title"]];
  if (title) {
    [sharingItems addObject:title];
  }

  UIActivityViewController *activityController = [[UIActivityViewController alloc] initWithActivityItems:sharingItems
                                                                                   applicationActivities:nil];
  UIViewController *rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
  [rootVC presentViewController:activityController animated:YES completion:nil];
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

@end
