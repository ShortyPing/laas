import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

@Controller('user/self')
@ApiTags("User (Self)")
export class SelfController {

}
