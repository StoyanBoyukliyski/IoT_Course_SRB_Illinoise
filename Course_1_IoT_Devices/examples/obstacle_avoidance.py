import picar_4wd as fc
import time

def main():
    while True:
        scan_list = fc.scan_step(40)
        gs_list = fc.get_grayscale_list()
        if not scan_list:
            continue

        tmp = scan_list[3:7]
        print(fc.get_line_status(100,gs_list))
        print(gs_list)
        if scan_list[3:6] != [2,2,2] or scan_list[4:7] != [2,2,2]:
            print('There is an obstacle')
            try:
                if scan_list[8:] == [2,2]:
                    #fc.turn_right(speed)
                    print('turn right')
                elif scan_list[:2] == [2,2]:
                    #fc.turn_left(speed)
                    print('turn left')
                else:
                    print('stop')
                    #fc.backward(speed)
            except:
                pass
                #fc.turn_right(speed)
        else:
            #fc.forward(speed)
            print('I am continuing because there is no obstacle')

if __name__ == "__main__":
    speed = 20
    try: 
        main()
    finally: 
        fc.stop()
